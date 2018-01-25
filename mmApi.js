var Promise = require('promise');

const mms = [
	{ name: "API1.0__自己", winxinName: "冰", winxinGroup: ["臭傻逼", "亲情聊天"], mmid: "mm_25794195_41744417_186800375"},
	{ name: "API1.0__吴豆子", winxinName: "吴豆子", winxinGroup: ["一点都不黑"], mmid: "mm_25794195_41744417_197688880"}
];

var getMmByWinxinName = function(winxinName) {
	for(var i = 0; i < mms.length; i++) {
		var mm = mms[i];
		if(winxinName == mm.winxinName) {
			return mm;
		}
	}
	return null;
}

var getMmByWinxinGroup = function(winxinGroup) {
	for(var i = 0; i < mms.length; i++) {
		var mm = mms[i];
		if(mm.winxinGroup.includes(winxinGroup)) {
			return mm;
		}
	}
	return null;
}

module.exports = {
    getMmByWinxinName: getMmByWinxinName,
    getMmByWinxinGroup: getMmByWinxinGroup
};
