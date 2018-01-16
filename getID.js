var request = require('request');

function getRidrectUrl(shortUrl) {
	request.get(shortUrl, function(err, res, body) {
		console.log(body.match(/&id=(\d+)/g)[0].match(/\d+/)[0]);
	});
}



getRidrectUrl("http://m.tb.cn/h.BxTYnx");