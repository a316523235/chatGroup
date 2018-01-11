// Require Nodejs v8+

// index.js
const Weixinbot = require('weixinbot');
var request = require('request');

const bot = new Weixinbot();
const tipGroups = ["@@8504cd58af8da4944a65290a383eb099c82c55a02586e41594ef2cccb6be3edc", "@@f97b48781113967bad9699be7fdbcb741b7c091d302f823d8f6d2994ae8a3962"];
const testTipGroups = ["@@8504cd58af8da4944a65290a383eb099c82c55a02586e41594ef2cccb6be3edc"];

//bot.on('qrcode', console.log);
bot.on('qrcode', dingTalk);

bot.on('friend', (msg) => {
  // console.log('begin Members ..');
  // console.log(bot.Members);
  // console.log('begin Groups ..');
  // console.log(bot.Groups);
  // console.log('begin find from Members ..');
  // var f = getMember(bot, msg.FromUserName);
  // console.log(f);
  // console.log('begin find to GroupMember ..');
  // var t = getGroupMember(bot, msg.FromUserName, msg.ToUserName);
  // console.log(t);

  // console.log('begin Groups ..');
  // console.log(bot.Groups);
  // console.log('begin GroupMembers ..');
  // console.log(bot.GroupMembers);
  // 
  console.log("发起人：" + msg.FromUserName);
  console.log("发送至：" + msg.ToUserName);
  console.log("msg.GroupMember");
  console.log(msg.GroupMember);
  console.log("msg.Group ");
  console.log(msg.Group);

  console.log('end ..');
  var isTipContent = (msg.Content.indexOf('手淘') > -1 && msg.Content.indexOf('点击链接') > -1) || msg.Content == "测试";
  if((testTipGroups.includes(msg.FromUserName)) && isTipContent) {
	  //console.log('有进来' + msg.Content);  
	  //bot.sendText(msg.FromUserName, '这下有说是测试了');
  } else {
	  //console.log('没进来' + msg.Content);
  }
});

function getMember(thisBot, id) {
    var member = thisBot.Members.findOne({ UserName: id });
    return member;
}

function getGroupMember(thisBot, id, groupId) {
    let member = thisBot.GroupMembers.findOne({
      UserName: id,
      GroupUserName: groupId,
    });

    if (member) return member;

    try {
      thisBot.fetchBatchgetContact([groupId]);
    } catch (e) {
      debug('fetchBatchgetContact error', e);
      return null;
    }

    member = this.GroupMembers.findOne({ UserName: id });
    return member;
}

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