var express = require('express');
var cors = require('cors')
var proxy = require('http-proxy-middleware');
var apiProxy = proxy('/rentals', { target: 'https://www.yougotlistings.com/api/rentals/search.php?key=1cY2iaM5eLEWXp7wmtUvgSPsozCJqQDubZ0BNKnk&include_mls=1', changeOrigin: true } );
var app = express();

app.use(cors())
app.use(apiProxy);

app.get('/', (req, res) => {
	res.send('You are connected to the root level of the Common Realty Group main server.')
})
app.listen(process.env.PORT || 3001, ()=> {
	console.log(`Server is running on port ${process.env.PORT}`)
});