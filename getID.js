var request = require('request');
ApiClient = require('./sdk-nodejs').ApiClient;

const client = new ApiClient({
    'appkey':'24770835',
    'appsecret':'d4ada29cd12178c7a671db37067258bc',
    'url':'http://gw.api.taobao.com/router/rest'
});

function getTkl() {
	client.execute('taobao.tbk.tpwd.create',
    {
        'text':'优惠商品',
        'url':'https://uland.taobao.com/coupon/edetail?e=I4r1v6MHasEGQASttHIRqVMGpsDWnkGJFxM9gJqbl20ujibHHIoHzCIfQrFfeguDSLljtHh26S8Qgx6SFRn59JQ5wfGz%2Fu%2BN8M3Y33hPSSQVF%2BLQAJXviHvlGh6jLO1J&traceId=0bba613b15161111527882166e',
    }, function (error,response) {
        if(!error)
            console.log(response);
        else
            console.log(error);
    });
}



function getMallProductID(shortUrl) {
	var realyUrl = "";
	request.get(shortUrl, function(err, res, body) {
		realyUrl = body.match(/&id=(\d+)/g)[0].match(/\d+/)[0];
		
	});
	console.log(realyUrl);
}

//getRidrectUrl("http://m.tb.cn/h.BxTYnx");
getTkl();