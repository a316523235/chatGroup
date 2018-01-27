// Require Nodejs v8+
// index.js
const Weixinbot = require('weixinbot');
var request = require('request');
var Promise = require('promise');
var tbkApi = require('./tbkApi.js');
var mmApi = require('./mmApi.js');
var dingTalkApi = require('./dingTalkApi.js');

var bot = new Weixinbot();
bot.on('qrcode', dingTalkApi.sendPicture);
bot.on('friend', (msg) =>  {
    var isTipUser = msg.Member.NickName == "冰" && msg.Member.Signature == "暖心手帐";
    var isTipContent = msg.Content.indexOf("http") > -1;
    if(isTipUser && isTipContent) {
      var mm = mmApi.getSelf();
      tbkApi.getLastInfo(msg.Content, mm.mmid)
      .then(function(data) {
        bot.sendText(msg.ToUserName, data.lastMsg);
        dingTalkApi.sendText(data.lastSelfMsg);
      })
      .catch(function(errMsg) {
        if(errMsg.indexOf("【提示】") > -1) {
          bot.sendText(msg.ToUserName, errMsg);
        } else {
          console.log(errMsg);
          if(!(errMsg.indexOf("【正常】") > -1)) {
              console.log(errMsg);
              dingTalkApi.sendText(errMsg);
              console.log(data.Content);
          }
        }
      });
    }

    
})
bot.on('group', (msg) => {
  console.log("群消息");
  var isTipContent = msg.Content.indexOf("http") > -1;
  if(isTipContent) {
    //console.log(msg);
    console.log(msg.Group.NickName);
    console.log(msg.GroupMember.DisplayName || msg.GroupMember.NickName);
    var mm = mmApi.getMmByWeixinGroup(msg.Group.NickName);
    if(mm) {
      tbkApi.getLastInfo(msg.Content, mm.mmid)
      .then(function(data) {
        bot.sendText(msg.FromUserName, data.lastMsg);
        dingTalkApi.sendText(data.lastSelfMsg);
      })
      .catch(function(errMsg) {
        if(errMsg.indexOf("【提示】") > -1) {
          bot.sendText(msg.FromUserName, errMsg);
        } else {
          console.log(errMsg);
          if(!(errMsg.indexOf("【正常】") > -1)) {
              console.log(errMsg);
              dingTalkApi.sendText(errMsg);
              console.log(data.Content);
          }
        }
      });
    }
  }
});
bot.run();