var Promise = require('promise');
var tbkApi = require('./tbkApi.js');
var mmApi = require('./mmApi.js');

function testTbkApi() {
	var weixinMsg = "@吴豆子 @吴豆子 我剁手都要买的宝贝（小鹿叮叮超柔婴儿纸尿裤L120片男女宝宝透气干爽尿不湿批发包邮），";
	weixinMsg +=  "快来和我一起瓜分红包】http://m.tb.cn/h.ZZtFUer?cv=3Sw8GMsraA&sm=523d5e 点击链接，再选择浏览器打开；或复制这条信息，打开👉手机淘宝👈￥3Sw8GMsraA￥";
	var mmid = "mm_25794195_41744417_186800375";
	//getLastInfo(weixinMsg, "mm_25794195_41744417_186800375");
	//test1(weixinMsg, "mm_25794195_41744417_186800375");
	tbkApi.getLastInfo(weixinMsg, mmid).then(function(data) {
		//{"lastMsg": lastMsg}
		//console.log("最终消息：" + JSON.stringify(data));
		console.log("最终消息：" + data.lastMsg);
		console.log("\n");
	}).catch(function(msg) {
		return rej(msg);
	})
}

function testMmApi() {
	console.log(mmApi.getMmByWinxinName("冰"));
	console.log(mmApi.getMmByWinxinGroup("一点都不黑"));
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
//testWeixinApi();
//testMmApi();