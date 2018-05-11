const schedule = require('node-schedule');
const request = require('request');
const parser = require('xml2json');

/* 
    Runs scheduler on a nightly basis and stores filtered into db
*/
const handleScheduler = (db) => {
    schedule.scheduleJob('0 0 * * *', function () {
        let options = {
            url: 'http://www.yougotlistings.com/feed',
            qs: {
                id: 'AKEXjsch69nLvbVGDZ7503Fzl4erR1iYPx8pwJoS',
                code: '0rQ3'
            }
        }

        request(options, (err, response, body) => {
            body = JSON.parse(parser.toJson(body));

            // filter data by cities
            const filteredData = body.hotPadsItems.Listing.map(data => {
                if (data.city === 'Cambridge' || data.city === 'Somerville') {
                    // replace yglmail to custom email
                    data.contactEmail = "Leasing@CommonRealtyGroup.com";
                    return data;
                }
            })

            // remove all old listings and push filtered listings
            body.hotPadsItems.Listing = [];
            body.hotPadsItems.Listing.push(filteredData.filter(n => n));

            // store data in db
            db('feed')
                .insert({
                    data: body,
                    created: new Date
                })
                .then(data => console.log('Feed stored successfully!'))
                .catch(err => console.log('Unable to store feed', err));
        })
    });
}

module.exports = {
    handleScheduler
}