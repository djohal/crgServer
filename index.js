var express = require('express');
var cors = require('cors')
var proxy = require('http-proxy-middleware');
var listingAPI = proxy('/rentals', { target: 'https://www.yougotlistings.com/api/rentals/search.php?key=1cY2iaM5eLEWXp7wmtUvgSPsozCJqQDubZ0BNKnk&include_mls=1', changeOrigin: true } );
var officeAPI = proxy('/office', { target: 'https://www.yougotlistings.com/api/accounts/search.php?key=1cY2iaM5eLEWXp7wmtUvgSPsozCJqQDubZ0BNKnk', changeOrigin: true } ); 
var app = express();

app.use(cors())
app.use(listingAPI);
app.use(officeAPI)

app.get('/', (req, res) => {
	res.send('You are connected to the root level of the main server. You will need additional commands to gain access to Common Realty Groups Data. NOTE: This activity has been logged.')
})
app.listen(process.env.PORT || 3001, ()=> {
	console.log(`Server is running on port ${process.env.PORT}`)
});