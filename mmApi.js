var Promise = require('promise');

const mms = [
	{ name: "API1.0__自己", weixinName: "---冰---", weixinGroup: ["臭傻逼", "亲情聊天","亲情自家群"], mmid: "mm_25794195_41744417_186800375"},
	{ name: "API1.0__吴豆子", weixinName: "吴豆子", weixinGroup: ["一点都不黑","2018桔柚"], mmid: "mm_25794195_41744417_197688880"}
];

var getMmByWeixinName = function(weixinName) {
	for(var i = 0; i < mms.length; i++) {
		var mm = mms[i];
		if(weixinName == mm.weixinName) {
			return mm;
		}
	}
	return null;
}

var getMmByWeixinMsg = function(weixinMsg) {
	for(var i = 0; i < mms.length; i++) {
		var mm = mms[i];
		if(weixinMsg.indexOf("@" + mm.weixinName + " ") > -1) {
			return mm;
		}
	}
	return null;
}

var getSelf = function() {
	return mms[0];
}

var getMmByWeixinGroup = function(weixinGroup) {
	for(var i = 0; i < mms.length; i++) {
		var mm = mms[i];
		if(mm.weixinGroup.includes(weixinGroup)) {
			return mm;
		}
	}
	return null;
}

module.exports = {
    getMmByWeixinName: getMmByWeixinName,
    getMmByWeixinMsg: getMmByWeixinMsg,
    getMmByWeixinGroup: getMmByWeixinGroup,
    getSelf: getSelf
};
