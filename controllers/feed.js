/* 
    @returns: latest feed from db
*/
const handleFeed = (db) => (req, res) => {
    db.select('data').from('feed')
        .orderBy('created', 'desc')
        .limit(1)
        .then(data => res.json(data))
        .catch(err => res.status(400).json('Unable to retrieve feed data'));
}

module.exports = {
    handleFeed
}