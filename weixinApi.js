var Promise = require('promise');

var getGroupNameByMsg = function(bot, msg) {
	return new Promise(function(resolve, rej) {
		if(msg.FromUserName.includes('@@')) {
			try {
				var group = bot.getGroup(msg.FromUserName);
				console.log(group);
				resolve({"groupName": group.NickName});
			} catch(e) {
				rej("【接口】获取群信息出错");
			}
		} else {
			rej("【常规】不是群消息");
		}
	});
}

var getGroupNameByMsgGroup = function(bot, msg) {
	return new Promise(function(resolve, rej) {
		if(msg.FromUserName.includes('@@')) {
			try {
				var groupName = msg.Group.NickName;
				resolve({"groupName": groupName});
			} catch(e) {
				rej("【接口】获取群信息出错");
			}
		} else {
			rej("【常规】不是群消息");
		}
	});
}

var getGroupNameByMsgTimeOut = function(bot, msg) {
	return new Promise(function(resolve, rej) {
		if(msg.FromUserName.includes('@@')) {
			setTimeout(function() {
		        console.log('步骤一：执行');
		        console.log(msg.Group);
		        console.log(msg.Group.NickName);
		        resolve({"groupName": msg.Group.NickName});
		    },500);
		} else {
			rej("【常规】不是群消息");
		}
	});
}