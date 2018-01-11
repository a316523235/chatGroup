// Require Nodejs v8+

// index.js
const Weixinbot = require('weixinbot');
var request = require('request');
var tbkApi = request('./tbkApi.js');

const bot = new Weixinbot();
const tipGroups = ["@@8504cd58af8da4944a65290a383eb099c82c55a02586e41594ef2cccb6be3edc", "@@f97b48781113967bad9699be7fdbcb741b7c091d302f823d8f6d2994ae8a3962"];
const testTipGroups = ["@@8504cd58af8da4944a65290a383eb099c82c55a02586e41594ef2cccb6be3edc"];

//bot.on('qrcode', console.log);
bot.on('qrcode', dingTalk);

bot.on('friend', (msg) => {
  console.log("发起人：" + msg.FromUserName);
  console.log("发送至：" + msg.ToUserName);
  var isTipGroup = testTipGroups.includes(msg.FromUserName);
  var isTipContent = (msg.Content.indexOf("http") > -1 && msg.Content.indexOf('手淘') > -1 && msg.Content.indexOf('点击链接') > -1) || msg.Content == "测试";
  console.log(msg.Member.NickName + '(' + isTipGroup.toString() + ' ' + isTipContent.toString() + '): ' + msg.Content);

  if((testTipGroups.includes(msg.FromUserName)) && isTipContent) {
	   console.log('有进来' + msg.Content);
     var shortUrl = msg.Content.substring(ss.indexOf("http"), ss.indexOf("点击链接"));
     console.log(shortUrl);
     tbkApi.getTaokoulinByAPI(shortUrl, function(lastMsg) { bot.sendText(msg.FromUserName, lastMsg)});
	   //bot.sendText(msg.FromUserName, '这下有说是测试了');
  } else {
	   console.log('没进来' + msg.Content);
  }
});

function dingTalk(qrcode) {
	console.log(qrcode);
    return;
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