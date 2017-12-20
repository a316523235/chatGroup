var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

function example1() {
	driver.get('https://www.baidu.com');
	driver.findElement(By.id('kw')).sendKeys('webdriver');
	driver.findElement(By.id('su')).click();
	driver.wait(until.titleIs('webdriver_百度搜索'), 1000);
}

function example2() {
	driver.get('https://www.baidu.com');
	var su = driver.findElement(By.id('su'));
	su.getAttribute('value').then(function(value) {
		console.log(value);
		example1();
		driver.findElement(By.id('s_tab')).getAttribute('class').then(function(value) {
			console.log(value);
		});
		
	});
}

//example1();
example2();
driver.quit();