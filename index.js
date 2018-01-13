// Require Nodejs v8+

// index.js
const Weixinbot = require('weixinbot');
var request = require('request');
var Promise = require('promise');
//var tbkApi = request('./tbkApi.js');

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

function getTaokoulinByAPI(shortUrl, weixinMsg) {
  var lastMsg = "";
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
      var data = JSON.parse(body);
      console.log(data);
      if(data && data.max_commission_rate && data.url) {
        if(data.coupon_info) {
          lastMsg = "佣金比例：" + data.max_commission_rate + "%\n优惠券：" + data.coupon_info 
            + "\n优惠地址：" + data.url;
        } else {
          lastMsg = "佣金比例：" + data.max_commission_rate + "%\n优惠券：无\n优惠地址：" + data.url;
        }
      } else {
        lastMsg = "该商品无佣金";
      }
      console.log(lastMsg)
      if(weixinMsg.Member.NickName == '冰') {
        //bot.sendText(weixinMsg.ToUserName, '这下有说是测试了');
        bot.sendText(weixinMsg.ToUserName, lastMsg);
      } else {
        //bot.sendText(weixinMsg.FromUserName, '这下有说是测试了');
        bot.sendText(weixinMsg.FromUserName, lastMsg);
      }
      
      //callback(lastMsg);
    });
  })
}

function getQueryString(url, name) { 
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
  var r = url.split('?')[1].match(reg); 
  if (r != null) return unescape(r[2]); return null; 
} 






const bot = new Weixinbot();
const tipNames = [""];
const testTipNames = ["冰", "福尔摩斯豆豆", "吴豆子"];

//bot.on('qrcode', console.log);
bot.on('qrcode', dingTalk);

bot.on('friend', (msg) => {
  console.log("发起人：" + msg.FromUserName);
  console.log("发送至：" + msg.ToUserName);
  //var isTipName = testTipGroups.includes(weixinMsg.Member.NickName) || msg.Content.indexOf("@吴豆子") > -1 || msg.Content.indexOf("@福尔摩斯豆豆") > -1;
  var isTipName = false;
  for(var i = 0; i < testTipNames.length; i++) {
    if(msg.Content.indexOf("@" + testTipNames[i] + " ") > -1) {
      console.log("找到了" + testTipNames[i]);
      isTipName = true;
      break;
    }
  }
  var isTipContent = msg.Content.indexOf("http") > -1 && msg.Content.indexOf('手淘') > -1 && msg.Content.indexOf('点击链接') > -1;
  console.log(msg.Member.NickName + '(' + isTipName.toString() + ' ' + isTipContent.toString() + '): ' + msg.Content);

  //if(true || ((testTipGroups.includes(msg.FromUserName)) && isTipContent)) {
  if(isTipName && isTipContent) {
	   console.log('有进来' + msg.Content);
     var shortUrl = msg.Content.substring(msg.Content.indexOf("http"), msg.Content.indexOf("点击链接"));
     console.log(shortUrl);
     getTaokoulinByAPI(shortUrl, msg);
	   //bot.sendText(msg.FromUserName, '这下有说是测试了');
  } else {
	   //console.log('没进来' + msg.Content);
     //bot.sendText(msg.ToUserName, '这\n下\r有说是测\n\r试了');
  }
});

function dingTalk(qrcode) {
	console.log(qrcode);
    //return;
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
                "text": "weixin",
                "title": "weixin", 
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

bot.run();