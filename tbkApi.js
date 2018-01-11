var request = require('request');
var Promise = require('promise');

var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();


const yishoudanTbID = 409468254;
const mms = [{
	name: "API1.0__自己",
	winxinName: "冰",
	mmid: "mm_25794195_41744417_186800375"
}];

//http://api.yishoudan.com/newapi/gysq/taobao_user_id/409468254/num_iid/561409509683/pid/mm_111149311_12424939_47176555

function getMM(winxinName) {
	for(var i in mms) {
		var mm = mms[i];
		console.log(mm);
		if(mm.winxinName == winxinName) {
			return mm;
		}
	}
}

function getYsdUrl(mm, mallProductID) {
	return 'http://api.yishoudan.com/newapi/gysq/taobao_user_id/409468254/num_iid/' + mallProductID + '/pid/' + mm.mmid;
}

function getTaokoulinByAPI(shortUrl) {
	var _realyUrl = "";
	var mallProductID = "";
	driver.get(shortUrl)
	.then(function() {
		driver.wait(until.urlContains('item.htm'), 30000);
		return driver.getCurrentUrl();
	})
	.then(function(realyUrl) {
		console.log(realyUrl);
		_realyUrl = realyUrl;
		mallProductID = getQueryString(_realyUrl, 'id');
		console.log(mallProductID);
		var mm = getMM('冰');
		console.log(mm);
		var ysdUrl = getYsdUrl(mm, mallProductID);
		console.log(ysdUrl);
		request.get(ysdUrl, function(err, res, body) {
			console.log(body);
			var data = JSON.parse(body);
			console.log(data);
		});
	})
}

function getQueryString(url, name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = url.split('?')[1].match(reg); 
	if (r != null) return unescape(r[2]); return null; 
} 

getTaokoulinByAPI('http://m.tb.cn/h.BxTYnx');