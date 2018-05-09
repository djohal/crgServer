const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const proxy = require('http-proxy-middleware');
const listingAPI = proxy('/rentals', { target: 'https://www.yougotlistings.com/api/rentals/search.php?key=1cY2iaM5eLEWXp7wmtUvgSPsozCJqQDubZ0BNKnk&include_mls=1', changeOrigin: true } );
const officeAPI = proxy('/office', { target: 'https://www.yougotlistings.com/api/accounts/search.php?&key=1cY2iaM5eLEWXp7wmtUvgSPsozCJqQDubZ0BNKnk', changeOrigin: true } );
const ZillowAPI = proxy('/zillow', { target: 'http://www.yougotlistings.com/feed?id=AKEXjsch69nLvbVGDZ7503Fzl4erR1iYPx8pwJoS&code=0rQ3', changeOrigin: true } );
const app = express();


app.use(cors())
app.use(listingAPI);
app.use(officeAPI);
app.use(ZillowAPI);

app.get('/', (req, res) => {
	res.send('You are connected to the root level')
})
app.listen(process.env.PORT || 3001, ()=> {
	console.log(`Server is running on port ${process.env.PORT}`)
});