# chatGroup
# https://www.cnblogs.com/fnng/p/5854875.html
# http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebElementPromise.html

npm i puppeteer
https://github.com/GoogleChrome/puppeteer/tree/v1.0.0

https://www.jianshu.com/p/016169820e46

发起人
冰：@3969c16193439de3d7d360e5831cb876

-- 群
臭傻逼：@@8504cd58af8da4944a65290a383eb099c82c55a02586e41594ef2cccb6be3edc
一点都不黑：@@f97b48781113967bad9699be7fdbcb741b7c091d302f823d8f6d2994ae8a3962



-- 消息
{
    "MsgId": "1241624069109402204",
    "FromUserName": "@216ec5e9eed53060143e28099c92cdd5",
    "ToUserName": "@@725385f66720227a939e1338559593412deab77dad71e66d0cfdeba8f660afa2",
    "MsgType": 1,
    "Content": "1",
    "Status": 3,
    "ImgStatus": 1,
    "CreateTime": 1513760901,
    "VoiceLength": 0,
    "PlayLength": 0,
    "FileName": "",
    "FileSize": "",
    "MediaId": "",
    "Url": "",
    "AppMsgType": 0,
    "StatusNotifyCode": 0,
    "StatusNotifyUserName": "",
    "RecommendInfo": {
        "UserName": "",
        "NickName": "",
        "QQNum": 0,
        "Province": "",
        "City": "",
        "Content": "",
        "Signature": "",
        "Alias": "",
        "Scene": 0,
        "VerifyFlag": 0,
        "AttrStatus": 0,
        "Sex": 0,
        "Ticket": "",
        "OpCode": 0
    },
    "ForwardFlag": 0,
    "AppInfo": {
        "AppID": "",
        "Type": 0
    },
    "HasProductId": 0,
    "Ticket": "",
    "ImgHeight": 0,
    "ImgWidth": 0,
    "SubMsgType": 0,
    "NewMsgId": 1241624069109402000,
    "OriContent": "",
    "EncryFileName": "",
    "Member": {
        "Uin": 0,
        "UserName": "@216ec5e9eed53060143e28099c92cdd5",
        "NickName": "冰",
        "HeadImgUrl": "/cgi-bin/mmwebwx-bin/webwxgeicon?seq=654042354&username=@216ec5e9eed53060143e28099c92cdd5&skey=@crypt_ad50c84e_e2ad72ad0e0530207295d9a6689fa001",
        "ContactFlag": 7,
        "MemberCount": 0,
        "MemberList": [],
        "RemarkName": "",
        "HideInputBarFlag": 0,
        "Sex": 1,
        "Signature": "暖心手帐",
        "VerifyFlag": 0,
        "OwnerUin": 0,
        "PYInitial": "B",
        "PYQuanPin": "bing",
        "RemarkPYInitial": "",
        "RemarkPYQuanPin": "",
        "StarFriend": 0,
        "AppAccountFlag": 0,
        "Statues": 0,
        "AttrStatus": 102503,
        "Province": "福建",
        "City": "福州",
        "Alias": "",
        "SnsFlag": 49,
        "UniFriend": 0,
        "DisplayName": "",
        "ChatRoomId": 0,
        "KeyWord": "a31",
        "EncryChatRoomId": "",
        "IsOwner": 0,
        "_id": "VuwYS0P8SiumtArH"
    }
}

//get coupon url
{ effectiveEndTime: null,
  effectiveStartTime: null,
  max_commission_rate: '5.50',
  coupon_end_time: false,
  coupon_start_time: false,
  info1: null,
  quan: null,
  coupon_info: null,
  count: null,
  rest: null,
  url: 'https://uland.taobao.com/coupon/edetail?e=I4r1v6MHasEGQASttHIRqVMGpsDWnk
GJFxM9gJqbl20ujibHHIoHzCIfQrFfeguDSLljtHh26S8Qgx6SFRn59JQ5wfGz%2Fu%2BN8M3Y33hPSS
QVF%2BLQAJXviHvlGh6jLO1J&traceId=0ab84e8915155984565074858e',
  session_end_time: 1520670291 }

  {
    "effectiveEndTime":"2018-01-20",
    "effectiveStartTime":null,
    "max_commission_rate":"30.00",
    "coupon_end_time":1516377600,
    "coupon_start_time":1516118400,
    "info1":"589",
    "quan":"505",
    "coupon_info":"满589元减505元",
    "count":100000,
    "rest":98150,
    "url":"https://uland.taobao.com/coupon/edetail?e=QCcW%2Bs7QjOYGQASttHIRqWu%2F2ZLvw%2F%2FsStCuuzYMc3QujibHHIoHzCIfQrFfeguDSLljtHh26S8Qgx6SFRn59JQ5wfGz%2Fu%2BN8M3Y33hPSSQGmY4hFfhtzGuFqp8TFaHMonv6QcvcARY%3D&traceId=0ab2507a15162869150885323e",
    "session_end_time":1520670291
}


//format    String  否   响应格式。默认为xml格式，可选值：xml，json。
//http://open.taobao.com/docs/api.htm?spm=a219a.7395905.0.0.xNICkx&scopeId=11655&apiId=31127

TopClient = require('./topClient').TopClient;
var client = new TopClient({
    'appkey': 'appkey',
    'appsecret': 'secret',
    'REST_URL': 'http://gw.api.taobao.com/router/rest'
});
 
client.execute('taobao.tbk.tpwd.create', {
    'user_id':'123',
    'text':'长度大于5个字符',
    'url':'https://uland.taobao.com/',
    'logo':'https://uland.taobao.com/',
    'ext':'{}'
}, function(error, response) {
    if (!error) console.log(response);
    else console.log(error);
})

<tbk_tpwd_create_response>
    <data>
        <model>￥AADPOKFz￥</model>
    </data>
</tbk_tpwd_create_response>

{
    "tbk_tpwd_create_response":{
        "data":{
            "model":"￥AADPOKFz￥"
        }
    }
}

{
    "error_response":{
        "sub_msg":"非法参数",
        "code":50,
        "sub_code":"isv.invalid-parameter",
        "msg":"Remote service error"
    }
}

1598668909

{"tbk_privilege_get_response":{"re
sult":{"data":{"category_id":122950001,"coupon_click_url":"https:\/\/uland.taoba
o.com\/coupon\/edetail?e=p44yuxn9AxYGQASttHIRqfUSqgR%2F8XwIJMHKHJWRAahkrBtp0jqDE
DOzByARy1khXiJ0CWofLpLkZct%2FkzjlML9fwBwwUiqluhHkHy0c%2F1f5P4Q5WAVSX27PVn13QcLNc
ISolD8QJ4or%2FU1KmdMVhQ%3D%3D&traceId=0b8f0d8215238030922602828","item_id":53932
4072168,"max_commission_rate":"5.00"}},"request_id":"ddbpyni35wn9"}}
