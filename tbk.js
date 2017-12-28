var request = require('request');
var Promise = require('promise');

var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

function example1() {
	driver.get('https://www.baidu.com');
	driver.findElement(By.id('kw')).sendKeys('webdriver');
	driver.findElement(By.id('su')).click();
	driver.wait(until.titleIs('webdriver_百度搜索'), 1000);
}

function example2() {
	driver.get('https://www.baidu.com');
	var su = driver.findElement(By.id('su'));
	su.getAttribute('value').then(function(value) {
		console.log(value);
		example1();
		driver.findElement(By.id('s_tab')).getAttribute('class').then(function(value) {
			console.log(value);
		});
		
	});
}

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
			return login();
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
		//find and click 立即推广
		try
		{
			driver.wait(until.elementLocated(By.className('block-search-box')), 5000);
		} catch(e) {
			driver.findElement(By.id("yxjh")).click();
			driver.wait(until.elementLocated(By.className('block-search-box')), 5000);
		}

		var box = driver.findElement(By.className('block-search-box'));
		// try
		// {
		// 	var tagCoupon = box.findElement(By.className('tag-coupon'));
		// 	hasCoupon = true;
		// } catch(e) {
		// 	console.log(hasCoupon ? "has coupon" : "not coupon");
		// }
		// console.log(hasCoupon ? "has coupon" : "not coupon");

		var selectBtn = box.findElement(By.className("box-btn-left"));
		return selectBtn.click();
	})
	.then(function() {
		//find and click 设置推广位
		console.log('find and click 设置推广位');
		var bdialogFt = driver.wait(until.elementLocated(By.className('bdialog-ft')), 5000);
		return bdialogFt.findElement(By.css('button[mx-click=submit]')).click();
	})
	.then(function() {
		//find and click 淘口令tab
		var magixVfCode = driver.wait(until.elementLocated(By.id('magix_vf_code')), 3000);
		var taoKouLinBtn = magixVfCode.findElement(By.class('tab-nav')).findElement(By.css('li:contains(淘口令)'));
		return taoKouLinBtn.click();
	})
	.then(function() {
		//find and get 淘口令代码
		if(hasCoupon) {
			var clipboardTarget = driver.wait(until.elementLocated(By.id('clipboard-target')), 3000);
			return clipboardTarget.getAttribute("value");
		} else {
			var clipboardTarget2 = driver.wait(until.elementLocated(By.id('clipboard-target-2')), 3000);
			return clipboardTarget2.getAttribute("value");
		}
	})
	.then(function(taoKouLinStr) {
		console.log("las taoKouLin str : " + taoKouLinStr);
	})
	// .catch(function() {
	// 	console.log("未找到相关商品");
	// })
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
getTbkInfo3('http://m.tb.cn/h.BxTYnx');
//driver.quit();