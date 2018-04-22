var express = require('express');
var proxy = require('http-proxy-middleware');

var apiProxy = proxy('/rentals', {
    target: 'https://www.yougotlistings.com/api/rentals/search.php?key=1cY2iaM5eLEWXp7wmtUvgSPsozCJqQDubZ0BNKnk&include_mls=1',
    changeOrigin: true   // for vhosted sites
});

var app = express();

app.use(apiProxy);
app.listen(process.env.PORT || 3001, ()=> {
	console.log(`Server is running on port ${process.env.PORT}`)
});