var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

function test() {
    driver.get('http://shopsearch.taobao.com');
    driver.wait(until.elementLocated(By.id('q')), 30000);
    driver.findElement(By.id('q')).sendKeys('Dreamyshow梦梦家女装');
    driver.findElement(By.css('button.submit')).click();
    console.log("why is sync");

    until = webdriver.until;
    //driver.wait(p => {
    //    var q = until.elementLocated(By.id('q'));
    //    var s = q.getText();
    //    console.log(s);
    //    if (s) {
    //        return s;
    //    }
    //}, 10000);
    driver.wait(until.elementLocated(By.id('q')), 10000);
    var lst = driver.findElement(By.id('q'));
    var str = lst.getText();
    driver.quit();
    return str;
}

var result = test();
console.log(result);
console.log(123456);
