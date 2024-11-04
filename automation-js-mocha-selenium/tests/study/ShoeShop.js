import { describe, before, after, afterEach, it } from 'mocha';
import { Builder, By, Key, until } from 'selenium-webdriver';
import { expect } from 'chai';

describe('Check Size Functionality', function() {
  let driver;
  let minSize, maxSize;

  before(async function() {
    this.timeout(30000); 
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://lm.skillbox.cc/qa_tester/module03/practice1/');

    //Достаем значения размеров из текста на сайте
    const subtitleText = await driver.findElement(By.css('.subtitle')).getText();
    const sizeRangeRegex = /с (\d+) по (\d+)/;
    const match = subtitleText.match(sizeRangeRegex);
    if (match) {
      minSize = parseInt(match[1]);
      maxSize = parseInt(match[2]);
      console.log(`SIZES: ${minSize}, ${maxSize}`);
    } else {
      throw new Error('Failed to extract size information from text');
    }
  });

  after(async function() {
    await driver.quit(); 
  });

  afterEach(async function() {
    // Очищаем поле ввода после каждого теста
    await driver.findElement(By.id('size')).clear();
  });

  async function enterSizeAndCheckError(size) {
    await driver.findElement(By.id('size')).sendKeys(size, Key.RETURN);
    try {
      await driver.wait(until.elementLocated(By.id('size-error')), 5000);
    } catch (error) {
      throw new Error(`Test "${this.currentTest.title}" failed. Expected error message to appear.`);
    }
    const errorMessage = await driver.findElement(By.id('size-error'));
    const isDisplayed = await errorMessage.isDisplayed();
    expect(isDisplayed).to.be.true;
  }

  async function enterSizeAndCheckSuccess(size) {
    await driver.findElement(By.id('size')).sendKeys(size, Key.RETURN);
    try {
      await driver.wait(until.elementLocated(By.id('size-success')), 5000);
    } catch (error) {
      throw new Error(`Test "${this.currentTest.title}" failed. Expected success message to appear.`);
    }
    const successMessage = await driver.findElement(By.id('size-success'));
    const isDisplayed = await successMessage.isDisplayed();
    expect(isDisplayed).to.be.true;
  }

  it('should display success message for valid size', async function() {
    await enterSizeAndCheckSuccess(minSize);
  }).timeout(50000);

  it('should display error message for size above range', async function() {
    await enterSizeAndCheckError(maxSize + 1);
  }).timeout(50000);

  it('should display error message for size below range', async function() {
    await enterSizeAndCheckError(minSize - 1);
  }).timeout(50000);

  it('should display error message for invalid input', async function() {
    await enterSizeAndCheckError('abc');
  }).timeout(50000);
});
