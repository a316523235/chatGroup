// Require Nodejs v8+

// index.js
const Weixinbot = require('weixinbot');
var request = require('request');
var Promise = require('promise');
ApiClient = require('./sdk-nodejs').ApiClient;
const client = new ApiClient({
    'appkey':'24770835',
    'appsecret':'d4ada29cd12178c7a671db37067258bc',
    'url':'http://gw.api.taobao.com/router/rest'
});
//var tbkApi = request('./tbkApi.js');


const yishoudanTbID = 409468254;
const mms = [{ name: "API1.0__自己", winxinName: "冰", mmid: "mm_25794195_41744417_186800375"},
{ name: "API1.0__吴豆子", winxinName: "吴豆子", mmid: "mm_25794195_41744417_197688880"}];

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
function getSendUserName(weixinMsg) {
	return weixinMsg.Member.NickName == '冰' ? weixinMsg.ToUserName : weixinMsg.FromUserName;
}

function getTaokoulinByAPI(title, shortUrl, weixinMsg, mm) {
  	var lastMsg = "";
  	var lastMsgForSelf = "";
  	var _realyUrl = "";
  	var mallProductID = "";
  	request.get(shortUrl, function(err, res, body) {
		mallProductID = body.match(/&id=(\d+)/g)[0].match(/\d+/)[0];
    	console.log(mallProductID);
    	//var mm = getMM('冰');
    	//console.log(mm);
    	var ysdUrl = getYsdUrl(mm, mallProductID);
    	lastMsg = "该商品无佣金";
    	console.log(ysdUrl);
	    request.get(ysdUrl, function(err, res, body) {
	      var data = JSON.parse(body);
	      console.log(data);
	      	if(data && data.max_commission_rate && data.url) {
		      	client.execute('taobao.tbk.tpwd.create', {
			        'text':'优惠商品淘口令',
			        'url': data.url
			      }, function (error,response) {
			    	var tkl = "";
			        if(!error && response.data.model)
			        {
			        	tkl = response.data.model;
			        	client.execute('taobao.tbk.item.info.get', {
			        		'fields':'zk_final_price,reserve_price',
			        		'num_iids': mallProductID
			        	}, function(itemError, itemResponse) {
			        		if(!error && itemResponse.results.n_tbk_item.length > 0) {
			        			var zk_final_price = itemResponse.results.n_tbk_item[0].zk_final_price
					        	lastMsg = title + "\n";
					        	lastMsg += "【在售价】 " + zk_final_price + "元\n";
					        	if(data.quan) {
					        		var lastPrice = (zk_final_price - data.quan).toFixed(2);
					        		lastMsg += "【券后价】 " + lastPrice + "元\n";
					        	}
					        	lastMsg += "------------\n";
					        	lastMsg += "复制这条信息，" + tkl + " 打开【手机淘宝】即可查看";
					        	bot.sendText(getSendUserName(weixinMsg), lastMsg);
			        		} else {
			        			console.log("淘宝接口：获取商品价格失败");
			        		}
			        	})
			        	//lastMsg = "商品：" + title + "\n淘口令：" + tkl + "\n------------\n复制这条信息，打开【手机淘宝】即可查看";
			        }
			        else
			        {
			        	console.log(error);
			        	//bot.sendText(getSendUserName(weixinMsg), lastMsg);
			        }
			        lastMsgForSelf = "商品：" + title + "\n佣金比例：" + data.max_commission_rate + "%\n优惠券：" + data.coupon_info 
		            +  "\n淘口令：" + tkl + "\n优惠券地址：" + data.url;
		            dingTalkForMsg(lastMsgForSelf);
			    });
	      	} else {
	      		bot.sendText(getSendUserName(weixinMsg), lastMsg);
	      	}
	    });
    });
}

function getQueryString(url, name) { 
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
  var r = url.split('?')[1].match(reg); 
  if (r != null) return unescape(r[2]); return null; 
} 

const bot = new Weixinbot();
//const tipNames = [""];
//const testTipNames = ["福尔摩斯豆豆", "吴豆子"];

//bot.on('qrcode', console.log);
bot.on('qrcode', dingTalk);

bot.on('friend', (msg) => {
  //console.log("发起人：" + msg.FromUserName);
  //console.log("发送至：" + msg.ToUserName);
  //var isTipName = testTipGroups.includes(weixinMsg.Member.NickName) || msg.Content.indexOf("@吴豆子") > -1 || msg.Content.indexOf("@福尔摩斯豆豆") > -1;
  var isTipName = false;
  var mm = mms[0];
  for(var i = 0; i < mms.length; i ++) {
  	if(msg.Content.indexOf("@" + mms[i].winxinName + " ") > -1) {
      //console.log("找到了");
      mm = mms[i];
      console.log(mm);
      isTipName = true;
      break;
    }
  }

  // for(var i = 0; i < testTipNames.length; i++) {
  //   if(msg.Content.indexOf("@" + testTipNames[i] + " ") > -1) {
  //     console.log("找到了" + testTipNames[i]);
  //     isTipName = true;
  //     break;
  //   }
  // }
  var isTipContent = msg.Content.indexOf("http") > -1 && (msg.Content.indexOf('手淘') > -1 || msg.Content.indexOf('手机淘宝') > -1) && msg.Content.indexOf('点击链接') > -1;
  console.log(msg.Member.NickName + '(' + isTipName.toString() + ' ' + isTipContent.toString() + '): ' + msg.Content);

  //if(true || ((testTipGroups.includes(msg.FromUserName)) && isTipContent)) {
  if(isTipName && isTipContent) {
	 console.log('有进来');
     var shortUrl = msg.Content.substring(msg.Content.indexOf("http"), msg.Content.indexOf("点击链接"));
     console.log(shortUrl);
     var title = msg.Content.substring(msg.Content.indexOf("（") + 1, msg.Content.indexOf("）"));
     console.log(title);
     getTaokoulinByAPI(title, shortUrl, msg, mm);
	   //bot.sendText(msg.FromUserName, '这下有说是测试了');
  } else {
	   //console.log('没进来' + msg.Content);
     //bot.sendText(msg.ToUserName, '这\n下\r有说是测\n\r试了');
  }
});

function dingTalk(qrcode) {
	console.log(qrcode);
    // return;
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
            //console.log(body);
        }
    });
};

function dingTalkForMsg(sendMsg) {
    //console.log(qrcode);
    //return;
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
            //console.log(body);
        }
    });
};

bot.run();