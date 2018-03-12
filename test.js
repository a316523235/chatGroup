var Promise = require('promise');
var tbkApi = require('./tbkApi.js');
var mmApi = require('./mmApi.js');
var dingTalkApi = require('./dingTalkApi.js');

function testTbkApi() {
	//var weixinMsg = " 【我剁手都要买的宝贝（LED吸顶灯长方形遥控大气客厅灯具现代简约卧室灯阳台灯餐厅灯饰），快来和我一起瓜分红I包】http://www.dwntme.com/h.Z0XJr6x 点击链接，再选择浏览器打开；或复制这条信息￥efM20lqldSe￥后打开👉手淘👈";
	var weixinMsg = "【我剁手都要买的宝贝（bebivita婴儿床实木无漆宝宝bb床摇篮床多功能儿童新生儿拼接大床），快来和我一起瓜分红I包】，复制这条信息￥zjHn0ofLJFg￥后打开👉手淘👈";
	var mmid = "mm_119516089_19314614_312936238";
	//getLastInfo(weixinMsg, "mm_25794195_41744417_186800375");
	//test1(weixinMsg, "mm_25794195_41744417_186800375");
	tbkApi.getLastInfo(weixinMsg, mmid).then(function(data) {
		//{"lastMsg": lastMsg}
		//console.log("最终消息：" + JSON.stringify(data));
		console.log("最终消息：" + data.lastMsg);
		console.log("\n\n");
		console.log("最终自己消息：" + data.lastSelfMsg);
		console.log("\n");
	}).catch(function(msg) {
		console.log(msg);
	})
}

function testMmApi() {
	console.log(mmApi.getMmByWeixinName("冰"));
	//console.log(mmApi.getMmByWeixinMsg("@吴豆子 【我剁手都要买的宝"));
	console.log(mmApi.getMmByWeixinGroup("一点都不黑"));
	console.log(mmApi.addUserByMsg("我要买东西", "testUser1"));
	console.log(mmApi.addGroupByMsg("我要买东西","testGroup1"));
	//console.log(mmApi.addGroup("我要买东西", "testGroup2"));
	//console.log(mmApi.removeGroup("testGroup1"));
}

function testWeixinApi() {
	const Weixinbot = require('weixinbot');
	const bot = new Weixinbot();
	bot.on('qrcode', console.log);
	bot.on('friend', (msg) => {
		console.log(msg.FromUserName);
	});
	bot.on('group', (msg) => {
		console.log("群消息");
		console.log(msg);
		console.log(msg.Group.NickName);
		console.log(msg.GroupMember.DisplayName || msg.GroupMember.NickName);
	});
	bot.run();
}

function testDingTalk() {
	dingTalkApi.sendText("测试");
}
//testWeixinApi();
testTbkApi();
//testDingTalk();
//testMmApi();