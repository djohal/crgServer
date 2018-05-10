const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const proxy = require('http-proxy-middleware');
const scheduler = require('./controllers/scheduler');
const feed = require('./controllers/feed');
const app = express();

const listingAPI = proxy('/rentals', {
	target: 'https://www.yougotlistings.com/api/rentals/search.php?key=1cY2iaM5eLEWXp7wmtUvgSPsozCJqQDubZ0BNKnk&include_mls=1',
	changeOrigin: true
});
const officeAPI = proxy('/office', {
	target: 'https://www.yougotlistings.com/api/accounts/search.php?&key=1cY2iaM5eLEWXp7wmtUvgSPsozCJqQDubZ0BNKnk',
	changeOrigin: true
});
const ZillowAPI = proxy('/zillow', {
	target: 'http://www.yougotlistings.com/feed?id=AKEXjsch69nLvbVGDZ7503Fzl4erR1iYPx8pwJoS&code=0rQ3',
	changeOrigin: true
});

app.use(cors())
app.use(listingAPI);
app.use(officeAPI);
app.use(ZillowAPI);

/* 
	Use the following for production db: 
		connectionString: process.env.DATABASE_URL,
		ssl: true
*/
const db = require('knex')({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: '',
		password: '',
		database: 'crg'
	}
});

// Calls the scheduler every midnight
scheduler.handleScheduler(db);

app.get('/', (req, res) => {
	res.send('You are connected to the root level')
})

app.get('/api/feed', feed.handleFeed(db));

app.listen(process.env.PORT || 3000, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});