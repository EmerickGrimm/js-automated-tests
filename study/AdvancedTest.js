import { Builder, By, Key, until } from 'selenium-webdriver';
import { expect } from 'chai';

const siteUrl = 'URL';

describe('Form Submission Tests', function () {
    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function () {
        await driver.quit();
    });

    it('should submit form with valid input', async function () {
        this.timeout(20000); 

        await driver.get(siteUrl);
    
        await driver.findElement(By.name('name')).sendKeys('John Doe');
        await driver.findElement(By.name('email')).sendKeys('john@example.com');
        await driver.findElement(By.name('phone')).sendKeys('1234567890');
        await driver.findElement(By.className("custom-form__button")).click();
    
        const textElement = await driver.wait(until.elementLocated(By.css('.start-screen__res')), 10000); 
        await driver.wait(until.elementIsVisible(textElement), 10000);
  
        const text = await textElement.getText();
    
        expect(text).to.contain('Здравствуйте, John Doe.');
        expect(text).to.contain('На вашу почту (john@example.com) отправлено письмо.');
        expect(text).to.contain('Наш сотрудник свяжется с вами по телефону: 1234567890.');
    });

    it('should not submit form with empty fields', async function () {
        await driver.get(siteUrl);
        this.timeout(20000); 

        
        const nameInput = await driver.findElement(By.name('name'));
        const emailInput = await driver.findElement(By.name('email'));
        const phoneInput = await driver.findElement(By.name('phone'));
        const submitButton = await driver.findElement(By.className("custom-form__button"));
    
        await nameInput.clear();
        await emailInput.clear();
        await phoneInput.clear();
    
        await submitButton.click();
    
        const errorMessage = await driver.findElement(By.css('.error-message'));
        const errorText = await errorMessage.getText();
        expect(errorText).to.equal('Пожалуйста, заполните поля.');
    });

    it('should not submit form with invalid email address', async function () {
        await driver.get(siteUrl);
        this.timeout(20000);

        
        await driver.findElement(By.name('name')).sendKeys('John Doe');
        await driver.findElement(By.name('email')).sendKeys('invalid_email');
        await driver.findElement(By.name('phone')).sendKeys('1234567890');
        await driver.findElement(By.className("custom-form__button")).click();
    
        const errorMessage = await driver.findElement(By.css('.error-message'));
        const errorText = await errorMessage.getText();
        expect(errorText).to.equal('Пожалуйста, введите правильный эмэйл.');
    });

    it('should not submit form with invalid phone number', async function () {
        await driver.get(siteUrl);
        this.timeout(20000);

        await driver.findElement(By.name('name')).sendKeys('John Doe');
        await driver.findElement(By.name('email')).sendKeys('john@example.com');
        await driver.findElement(By.name('phone')).sendKeys('invalid_phone');
        await driver.findElement(By.className("custom-form__button")).click();
    
        const errorMessage = await driver.findElement(By.css('.error-message'));
        const errorText = await errorMessage.getText();
        expect(errorText).to.equal('Пожалуйста, введите правильный номер телефона.');
    });

    it('should reset form after successful submission', async function () {
        await driver.get(siteUrl);
        this.timeout(20000);

        await driver.findElement(By.name('name')).sendKeys('John Doe');
        await driver.findElement(By.name('email')).sendKeys('john@example.com');
        await driver.findElement(By.name('phone')).sendKeys('1234567890');
        await driver.findElement(By.className("custom-form__button")).click();
        
        const nameValue = await driver.findElement(By.name('name')).getAttribute('value');
        const emailValue = await driver.findElement(By.name('email')).getAttribute('value');
        const phoneValue = await driver.findElement(By.name('phone')).getAttribute('value');
    
        expect(nameValue).to.equal('');
        expect(emailValue).to.equal('');
        expect(phoneValue).to.equal('');
    });
    
});
