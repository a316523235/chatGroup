// Require Nodejs v8+
// index.js
const Weixinbot = require('weixinbot');
var request = require('request');
var Promise = require('promise');
var tbkApi = require('./tbkApi.js');
var mmApi = require('./mmApi.js');
var dingTalkApi = require('./dingTalkApi.js');

var bot = new Weixinbot();
bot.on('qrcode', console.log);
bot.on('friend', (msg) =>  {

})
bot.on('group', (msg) => {
  console.log("群消息");
  //console.log(msg);
  console.log(msg.Group.NickName);
  console.log(msg.GroupMember.DisplayName || msg.GroupMember.NickName);
  var mm = mmApi.getMmByWinxinGroup(msg.Group.NickName);
  if(mm) {
    tbkApi.getLastInfo(msg.Content, mm.mmid)
    .then(function(data) {
      bot.sendText(msg.FromUserName, data.lastMsg);
    })
    .catch(function(errMsg) {
      if(errMsg.indexOf("【提示】") > -1) {
        bot.sendText(msg.FromUserName, errMsg);
      } else {
        console.log(errMsg);
        if(!(errMsg.indexOf("【正常】") > -1)) {
            console.log(msg.Content);
        }
      }
    })
  }
});
bot.run();