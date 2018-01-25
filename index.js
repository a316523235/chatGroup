// Require Nodejs v8+
// index.js
const Weixinbot = require('weixinbot');
var request = require('request');
var Promise = require('promise');

var bot = new Weixinbot();

bot.run();