var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

function login() {
	driver.get('https://ad.alimama.com/index.htm');
	//driver.findElement(By.id('J_QRCodeImg')).sendKeys('webdriver');
	driver.wait(until.titleIs('联盟商家中心'), 30000);
	driver.wait(until.elementLocated(By.id('J_QRCodeImg')), 30000);
	//driver.findElement(By.id('magix_vf_header'))
	driver.findElement(By.id('J_Quick2Static')).click();
	driver.findElement(By.id('TPL_username_1')).sendKeys('冰风沉醉');
	driver.findElement(By.id('TPL_password_1')).sendKeys('@GGcyw2010');
	driver.findElement(By.id('J_SubmitStatic')).click();
	//driver.wait(until.titleIs('webdriver_百度搜索'), 1000);
	//driver.quit();
}

login();
