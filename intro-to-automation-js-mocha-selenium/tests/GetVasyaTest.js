import { Builder, By, Key, until } from 'selenium-webdriver';
import { expect } from 'chai';
describe('Hello Vasya', function () {
    this.timeout(10000); // увеличим время ожидания для выполнения операций

    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function () {
        await driver.quit();
    });

    it('should enter name "Вася" in name field and get greeting message', async function () {
        await driver.get('URL');
        await driver.findElement(By.name('name')).sendKeys('Вася');
        await driver.findElement(By.className("button")).click();
        const greetingMessage = await driver.findElement(By.className('start-screen__res')).getText();
        expect(greetingMessage).to.include('Привет, Вася!');
    });
});
