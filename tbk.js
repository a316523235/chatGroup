var request = require('request');
var Promise = require('promise');

var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

function getTbkInfo2(shortUrl) {
	driver.get('https://pub.alimama.com/index.htm')
	.then(function() {
		var iframe = driver.wait(until.elementLocated(By.css('iframe[name=taobaoLoginIfr]')), 30000);
		return iframe.getAttribute("src");
	})
	.then(function(loginIframeSrc) {
		return driver.get(loginIframeSrc);
	})
	.then(function() {
		var JQRCodeLogin = driver.wait(until.elementLocated(By.id('J_QRCodeLogin')), 10000);
		var jQRCodeImg = JQRCodeLogin.findElement(By.id('J_QRCodeImg')).findElement(By.tagName('img'));
		return jQRCodeImg.getAttribute('src');
	})
	.then(function(qrCodeUrl) {
		console.log('here');
		console.log(qrCodeUrl);
		alimamaDingTalk(qrCodeUrl);
		driver.wait(until.elementLocated(By.id('J_menu_login32142')), 60000);
	})
}

function getTbkInfo3(shortUrl) {
	// driver.get(shortUrl)
	// .then(function() {
	// 	driver.wait(until.urlContains('item.htm'), 30000);
	// 	return driver.getCurrentUrl();
	// })
	// .then(function(realry) {

	// })
	var _realyUrl = "";
	var hasCoupon = false;
	var couponValue = 0;
	var blockSearchBox;


	driver.get('https://pub.alimama.com/index.htm')
	.then(function() {
		var menuUserName = driver.wait(until.elementLocated(By.className('menu-username')), 30000);
		return menuUserName.getText();
	})
	.then(function(userName) {
		console.log('返回的名字：' + userName); 
		if(userName.indexOf('冰风沉醉') > -1) {
			return pOK();
		} else {
			//return login();
			return pOK();
		}
	})
	.then(function() {
		return driver.get(shortUrl);
	})
	.then(function() {
		driver.wait(until.urlContains('item.htm'), 30000);
		return driver.getCurrentUrl();
	})
	.then(function(realyUrl) {
		console.log(realyUrl);
		_realyUrl = realyUrl;
		return driver.get('https://pub.alimama.com/index.htm');
	})
	.then(function() {
		var q = driver.wait(until.elementLocated(By.id('q')), 30000);
		console.log(_realyUrl);
		return q.sendKeys(_realyUrl);
	})
	.then(function() {
		return driver.findElement(By.className('search-btn')).click();
	})
	.then(function() {
		driver.wait(until.elementLocated(By.id("yxjh")), 5000);
		return driver.executeScript('return $(".block-search-box").length;')
	})
	.then(function(boxLength) {
		console.log('---------------1 :' + boxLength);
		if(boxLength >= 1) {
			return pOK();
		} else {
			return driver.findElement(By.id("yxjh")).click();
		}
	})
	.then(function() {
		console.log('000000000000000');
		//find and click 立即推广
		blockSearchBox = driver.wait(until.elementLocated(By.className('block-search-box')), 50000);
		//console.log('111111111111 : ' + blockSearchBox.length);
		return blockSearchBox.getAttribute('class');
	})
	.then(function(found) {
		console.log('222222222222: ' + found);
		driver.wait(until.elementLocated(By.className('blbox1111111111')), 30000);

		if(!found) {
			return pOK();
		} else {
			var couponSpan = found.findElement(By.className('money')).findElement(By.css('span'));
			console.log('cccccccccccc : ' + couponSpan.length);
			return couponSpan.getText();
		}
	})
	.then(function(cpValue) {
		console.log('333333333333333');
		if(cpValue) {
			hasCoupon = true;
			couponValue = parseInt(couponValue);
			console.log('hasCoupon' + hasCoupon);
			console.log('couponValue' + couponValue);
		} else {
			console.log('not coupon');
		}
		return blockSearchBox.findElement(By.linkText('立即推广')).click();



		// hasCoupon = driver.executeScript('return $(".block-search-box").first().find(".tag-coupon").length >= 1');
		// if(hasCoupon) {
		// 	couponValue = driver.executeScript('return $(".block-search-box").eq(4).find(".money span").text()')
		// 	if(couponValue) {
		// 		couponValue = parseInt(couponValue);
		// 	}
		// }
		// console.log("hasCoupon" + hasCoupon);
		// console.log("couponValue" + couponValue);
		// return driver.executeScript('$(".box-btn-left").first().click();');
		// console.log("is goto 1");
	 	
		// // try
		// // {
		// // 	var tagCoupon = box.findElement(By.className('tag-coupon'));
		// // 	hasCoupon = true;
		// // } catch(e) {
		// // 	console.log(hasCoupon ? "has coupon" : "not coupon");
		// // }
		// // console.log(hasCoupon ? "has coupon" : "not coupon");
		// console.log("is goto 2");
		//var selectBtn = box.findElement(By.className("box-btn-left"));
		// console.log("is goto 11");
		//return selectBtn.click();
	})
	.then(function() {
		return driver.executeScript('return 1');
	})
	.then(function() {
		//find and click 设置推广位
		console.log('find and click 设置推广位');
		return driver.executeAsyncScript('$(".dialog-ft").find("button").first().click()');
		//var bdialogFt = driver.wait(until.elementLocated(By.className('dialog-ft')), 5000);
		//return bdialogFt.findElement(By.css('button[mx-click=submit]')).click();
	})
	.then(function() {
		//find and click 淘口令tab
		console.log('find and click 淘口令tab');
		//return driver.executeScript('$("#magix_vf_code").find("li:contains(淘口令)").first().click()');
		var magixVfCode = driver.wait(until.elementLocated(By.id('magix_vf_code')), 50000);
		var taoKouLinBtn = magixVfCode.findElement(By.className('tab-nav')).findElement(By.css('li:contains(淘口令)'));
		return taoKouLinBtn.click();
	})
	.then(function() {
		//find and get 淘口令代码
		console.log('find and get 淘口令代码');
		if(hasCoupon) {
			var clipboardTarget = driver.wait(until.elementLocated(By.id('clipboard-target')), 50000);
			return clipboardTarget.getAttribute("value");
		} else {
			var clipboardTarget2 = driver.wait(until.elementLocated(By.id('clipboard-target-2')), 50000);
			return clipboardTarget2.getAttribute("value");
		}
	})
	.then(function(taoKouLinStr) {
		console.log("las taoKouLin str : " + taoKouLinStr);
		return pOK();
	})
	// // .catch(function() {
	// // 	console.log("未找到相关商品");
	// // })
	.then(function() {
		driver.wait(until.elementLocated(By.id("yxjh333333")), 15000);
		console.log("is over");
	})
}

function login() {
	return new Promise(function(resolve, reject) {
		driver.get('https://pub.alimama.com/index.htm')
		.then(function() {
			console.log(1);
			var iframe = driver.wait(until.elementLocated(By.css('iframe[name=taobaoLoginIfr]')), 30000);
			return iframe.getAttribute("src");
		})
		.then(function(loginIframeSrc) {
			console.log(2);
			return driver.get(loginIframeSrc);
		})
		.then(function() {
			console.log(3);
			var JQRCodeLogin = driver.wait(until.elementLocated(By.id('J_QRCodeLogin')), 10000);
			var jQRCodeImg = JQRCodeLogin.findElement(By.id('J_QRCodeImg')).findElement(By.tagName('img'));
			return jQRCodeImg.getAttribute('src');
		})
		.then(function(qrCodeUrl) {
			console.log(4);
			console.log('here');
			console.log(qrCodeUrl);
			//alimamaDingTalk(qrCodeUrl);
			driver.wait(until.urlContains('pub.alimama.com'), 60000);
		})
		.then(function() {
			console.log(5);
			resolve();
		})
		.catch(function() {
			reject("登录淘宝客失败");
		})
	})
}

function pOK() {
	return new Promise(function(resolve, reject) {
		resolve();
	})
}



function alimamaDingTalk(qrcode) {
	console.log(qrcode);
    var options = {
        method: 'post',
        url: 'https://oapi.dingtalk.com/robot/send?access_token=c88befc4e1bc5ef9e289fd6e5891d37bf6f402f3d2aafdb8d0519f46786d23e7',
        json: true,
        headers: {
            'content-type': 'application/json'
        },
        body: {
            "msgtype": "link", 
            "link": {
                "text": "alimama",
                "title": "alimama", 
                "picUrl": qrcode,
                "messageUrl": qrcode
            }
        }
    };

    var r = request(options, function (error, response, body) {
        if (!error) {
            console.log(body);
        }
    });
};

//login();

//example1();
//example2();
//getTbkInfo2('https://detail.tmall.com/item.htm?id=556227443376&ut_sk=1.WdcRwYYfoP8DAEyjsHitmqkx_21380790_1513865805666.TaoPassword-Weixin.baobeixiangqingfenxiang&from=tbkfenxiangplus&suid=C9882239-5455-4881-A830-F1C1AC11E59B&tbkShareId=2555017770&systype=m&ali_trackid=2:mm_26632441_0_0:1513866407388_213_6540357480&fromScene=100&sourceType=item&shareid=CE9EA75B-45AB-435E-8833-0E04F035A8B8&un=aca25f20cf947f9246e6040d6f65052e&share_crt_v=1&cpp=1&shareurl=true&spm=a313p.22.4n.85329150789&short_name=h.BxEUKv&app=chrome');
// getTbkInfo3('http://m.tb.cn/h.BxTYnx');
getTbkInfo3('https://detail.tmall.com/item.htm?id=530783481192&spm=a219t.7900221/10.1998910419.d30ccd691.62903cdeBqhGxo&sku_properties=20397:10122');
//driver.quit();