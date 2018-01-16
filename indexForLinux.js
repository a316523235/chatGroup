// Require Nodejs v8+

const Weixinbot = require('weixinbot');
var request = require('request');
var Promise = require('promise');
//var tbkApi = request('./tbkApi.js');

const appKey = 24770835;
const aapSecret = "d4ada29cd12178c7a671db37067258bc";
const yishoudanTbID = 409468254;
const mms = [{ name: "API1.0__自己", winxinName: "冰",  mmid: "mm_25794195_41744417_186800375"}];
//http://api.yishoudan.com/newapi/gysq/taobao_user_id/409468254/num_iid/561409509683/pid/mm_111149311_12424939_47176555
function getMM(winxinName) {
  var existMM = "";
  mms.forEach(mm => { if(mm.winxinName=='冰') { existMM == mm; return; } })
  return existMM;
}
function getYsdUrl(mm, mallProductID) {
  return 'http://api.yishoudan.com/newapi/gysq/taobao_user_id/409468254/num_iid/' + mallProductID + '/pid/' + mm.mmid;
}

function getTaokoulinByAPI(title, shortUrl, weixinMsg, mm) {
  var lastMsg = "";
  var lastMsgForSelf = "";
  var _realyUrl = "";
  var mallProductID = "";
  request.get(shortUrl, function(err, res, body) {
  	try {
	  mallProductID = body.match(/&id=(\d+)/g)[0].match(/\d+/)[0];
  	} catch(e) {}
  	if(mallProductID) { return; }
  	console.log(mallProductID);
    console.log(mm);
    var ysdUrl = getYsdUrl(mm, mallProductID);
    console.log(ysdUrl);
    request.get(ysdUrl, function(err, res, body) {
      var data = JSON.parse(body);
      console.log(data);
      if(data && data.max_commission_rate && data.url) {
        //自己的消息
        if(data.coupon_info) {
          lastMsgForSelf = "商品：" + title + "\n佣金比例：" + data.max_commission_rate + "%\n优惠券：" + data.coupon_info 
            + "\n优惠券地址：" + data.url;
          
        } else {
          lastMsgForSelf = "商品：" + title + "\n佣金比例：" + data.max_commission_rate + "%\n优惠券：无\n优惠地址：" + data.url;
        }
        dingTalkForMsg(lastMsgForSelf);

        //别人的消息
        lastMsg = "商品：" + title + "\n优惠券地址：" + data.url;
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
  });
}

const bot = new Weixinbot();

//bot.on('qrcode', console.log);
bot.on('qrcode', dingTalk);

bot.on('friend', (msg) => {
  console.log("发起人：" + msg.FromUserName);
  console.log("发送至：" + msg.ToUserName);
  var isTipName = false;
  var mm = mms[0];
  for(var i = 0; i < mms.length; i++) {
    if(msg.Content.indexOf("@" + mms[i].winxinName + " ") > -1) {
      console.log("找到了" + mms[i]);
      mm = mms[i];
      isTipName = true;
      break;
    }
  }
  var isTipContent = msg.Content.indexOf("http") > -1 && msg.Content.indexOf('手淘') > -1 && msg.Content.indexOf('点击链接') > -1;
  console.log(msg.Member.NickName + '(' + isTipName.toString() + ' ' + isTipContent.toString() + '): ' + msg.Content);

  if(isTipName && isTipContent) {
	   console.log('有进来' + msg.Content);
     var shortUrl = msg.Content.substring(msg.Content.indexOf("http"), msg.Content.indexOf("点击链接"));
     var title = msg.Content.substring(msg.Content.indexOf("（") + 1, msg.Content.indexOf("）"));
     console.log(shortUrl);
     getTaokoulinByAPI(title, shortUrl, msg, mm);
  } else {
	   //console.log('没进来' + msg.Content);
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

function dingTalkForMsg(sendMsg) {
    //console.log(qrcode);
    return;
    var options = {
        method: 'post',
        url: 'https://oapi.dingtalk.com/robot/send?access_token=c88befc4e1bc5ef9e289fd6e5891d37bf6f402f3d2aafdb8d0519f46786d23e7',
        json: true,
        headers: {
            'content-type': 'application/json'
        },
        body: {
            "msgtype": "text", 
            "text": {
              "content": sendMsg
            },
            "at": {} 
        }
    };

    var r = request(options, function (error, response, body) {
        if (!error) {
            console.log(body);
        }
    });
};

bot.run();