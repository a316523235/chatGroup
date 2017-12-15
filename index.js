// Require Nodejs v8+

// index.js
const Weixinbot = require('weixinbot');
var request = require('request');

const bot = new Weixinbot();

//bot.on('qrcode', console.log);
bot.on('qrcode', dingTalk);

bot.on('friend', (msg) => {
  console.log(msg.Member.NickName + ': ' + msg.Content);
  // if((msg.Content.indexOf('手淘') > -1 && msg.Content.indexOf('点击链接') > -1) || msg.Content.indexOf('i厦门') > -1) {
	// console.log('有进来' + msg.Content);  
	// bot.sendText(msg.FromUserName, '这下有说是测试了');
  // } else {
	// console.log('没进来' + msg.Content);
  // }
});

function dingTalk(qrcode) {
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