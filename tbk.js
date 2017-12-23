var request = require('request');

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

function getTbkInfo(shortUrl) {
	driver.get('https://www.alimama.com/index.htm');
	driver.wait(until.elementLocated(By.id('J_menu_login')), 30000);
	driver.findElement(By.id('J_menu_login')).click();
	driver.wait(until.elementLocated(By.css('iframe[name=taobaoLoginIfr]')), 30000);
	var loginIframe = driver.findElement(By.css('iframe[name=taobaoLoginIfr]'));
	loginIframe.getAttribute('src').then(function(value) {
		driver.get(value);
		driver.executeScript('return $("#magix_vf_root").attr("id")').then(function(result) {
			console.log("come");
			console.log(result);
		})


		driver.wait(until.urlIs('https://www.alimama.com/index.htm'), 30000);
		driver.get('https://pub.alimama.com/');
		driver.wait(until.elementLocated(By.id('q')), 30000);
		driver.findElement(By.id('q')).sendKeys(shortUrl);
		driver.wait(until.elementLocated(By.id('qwertrtesttest')), 30000);





		// //driver.wait(until.urlIs(value), 30000);
		// driver.wait(until.elementLocated(By.css('J_QRCodeImg')), 90000);
		// var jQRCodeImg = driver.findElement(By.css('J_QRCodeImg'));
		// jQRCodeImg.getAttribute('class').then(function(testValue) {
		// 	console.log(testValue);
		// 	var jQRCodeImgImg = jQRCodeImg.findElement(By.tagName(img));
		// 	jQRCodeImgImg.getAttribute('src').then(function(qrCodeUrl) {
		// 		console.log('come here');
		// 		console.log(qrCodeUrl);
		// 		driver.wait(until.urlIs('https://www.alimama.com/index.htm'), 30000);
		// 		driver.get('https://pub.alimama.com/');
		// 		driver.wait(until.elementLocated(By.id('q')), 30000);
		// 		driver.findElement(By.id('q')).sendKeys(shortUrl);
		// 		driver.wait(until.elementLocated(By.id('qwertrtesttest')), 30000);
		// 	})
		// });
	})
}

function login() {
	driver.get('https://pub.alimama.com/index.htm');
	driver.wait(until.elementLocated(By.css('iframe[name=taobaoLoginIfr]')), 30000);



	driver.executeScript('return $("#magix_vf_root").attr("id")').then(function(result) {
		console.log("come");
		console.log(result);
	})
	console.log('here');
	//console.log(qrCodeUrl);
	driver.wait(until.elementLocated(By.css('J_QRCodeImg')), 90000);
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
getTbkInfo2('https://detail.tmall.com/item.htm?id=556227443376&ut_sk=1.WdcRwYYfoP8DAEyjsHitmqkx_21380790_1513865805666.TaoPassword-Weixin.baobeixiangqingfenxiang&from=tbkfenxiangplus&suid=C9882239-5455-4881-A830-F1C1AC11E59B&tbkShareId=2555017770&systype=m&ali_trackid=2:mm_26632441_0_0:1513866407388_213_6540357480&fromScene=100&sourceType=item&shareid=CE9EA75B-45AB-435E-8833-0E04F035A8B8&un=aca25f20cf947f9246e6040d6f65052e&share_crt_v=1&cpp=1&shareurl=true&spm=a313p.22.4n.85329150789&short_name=h.BxEUKv&app=chrome');
//driver.quit();