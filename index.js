// Require Nodejs v8+
// index.js
const Weixinbot = require('weixinbot');
var request = require('request');
var Promise = require('promise');
var tbkApi = require('./tbkApi.js');
var mmApi = require('./mmApi.js');
var dingTalkApi = require('./dingTalkApi.js');

function isTip(str) {
  return str.indexOf("淘") > -1;
}

var bot = new Weixinbot();
bot.on('qrcode', dingTalkApi.sendPicture);
bot.on('friend', (msg) =>  {
  //console.log("朋友消息");
  //console.log(msg.Member.NickName);
  var isSelf = msg.Member.NickName == "冰" && msg.Member.Signature == "暖心手帐";
  var isTipContent = isTip(msg.Content);

  if(isTipContent) {
    var mm = mmApi.getMmByWeixinName(msg.Member.NickName);
    responseWeixinMsg(msg, mm, isSelf);
  }
})

bot.on('group', (msg) => {
  //console.log("群消息");
  //console.log(msg);
  //console.log(msg.Group.NickName);
  //console.log(msg.GroupMember.DisplayName);
  var isTipContent = isTip(msg.Content);
  
  if(isTipContent) {
    var mm = mmApi.getMmByWeixinGroup(msg.Group.NickName);
    responseWeixinMsg(msg, mm, false);
  }
});
bot.run();

var responseWeixinMsg = function(msg, mm, isSelf) {
  //var sendTo = isSelf ? msg.ToUserName : msg.FromUserName;
  var sendTo = msg.FromUserName;
  tbkApi.getLastInfo(msg.Content, mm.mmid)
  .then(function(data) {
    //bot.sendText(sendTo, data.lastMsg);
    bot.sendText(sendTo, data.lastSelfMsg);
    dingTalkApi.sendText(data.lastSelfMsg);
  })
  .catch(function(errMsg) {
    if(errMsg.indexOf("【提示】") > -1) {
      bot.sendText(sendTo, errMsg);
    } else {
      console.log(errMsg);
      if(!(errMsg.indexOf("【正常】") > -1)) {
          console.log(errMsg);
          dingTalkApi.sendText("错误结果：" + errMsg + "\n 错误原始消息：data.Content");
          console.log(data.Content);
      }
    }
  });
}