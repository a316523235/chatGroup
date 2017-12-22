var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

function test() {
    driver.get('https://www.baidu.com/');
    driver.wait(until.elementLocated(By.id('head')), 30000);
    var head = driver.findElement(By.id('head'));
    head.getAttribute('id').then(function (value) {
        console.log(value);
    });
    driver.takeScreenshot().then(function (bs64) {
        console.log(bs64);
        //var dataBuffer = new Buffer(bs64, 'base64');
    });
    
    console.log("here");
}

test();
//var result = test();
//console.log(result);
console.log(123456);