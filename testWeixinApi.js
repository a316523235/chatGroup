const Weixinbot = require('weixinbot');
var weixinApi = require('./weixinApi');
const bot = new Weixinbot();
bot.on('qrcode', console.log);
bot.on('friend', (msg) => {
	console.log(msg.FromUserName);
	if(msg.FromUserName.includes('@@')) {
		console.log("能进来");
		// weixinApi.getGroupNameByMsg(bot, msg).then(function(data) {
		// 	console.log("获取群名称1：" + JSON.stringify(data));
		// }).catch(function(msg) {
		// 	console.log(msg);
		// });

		// weixinApi.getGroupNameByMsgGroup(bot, msg).then(function(data) {
		// 	console.log("获取群名称2：" + JSON.stringify(data));
		// }).catch(function(msg) {
		// 	console.log(msg);
		// });

		// weixinApi.getGroupNameByMsgTimeOut(bot, msg).then(function(data) {
		// 	console.log("获取群名称3：" + JSON.stringify(data));
		// }).catch(function(msg) {
		// 	console.log(msg);
		// });
	} else {
		console.log("跳过");
	}
});

bot.on('group', (msg) => {
	console.log("群消息");
	console.log(msg);
	console.log(msg.Group.NickName);
	console.log(msg.GroupMember.DisplayName || msg.GroupMember.NickName);
	// console.log(msg.FromUserName);
	// if(msg.FromUserName.includes('@@')) {
	// 	console.log("能进来");
	// 	weixinApi.getGroupNameByMsg(bot, msg).then(function(data) {
	// 		console.log("获取群名称1：" + JSON.stringify(data));
	// 	}).catch(function(msg) {
	// 		console.log(msg);
	// 	});

	// 	weixinApi.getGroupNameByMsgGroup(bot, msg).then(function(data) {
	// 		console.log("获取群名称2：" + JSON.stringify(data));
	// 	}).catch(function(msg) {
	// 		console.log(msg);
	// 	});

	// 	weixinApi.getGroupNameByMsgTimeOut(bot, msg).then(function(data) {
	// 		console.log("获取群名称3：" + JSON.stringify(data));
	// 	}).catch(function(msg) {
	// 		console.log(msg);
	// 	});
	// } else {
	// 	console.log("跳过");
	// }
});

bot.run();