import { describe, before, after, it } from 'mocha';
import { Builder, By } from 'selenium-webdriver';
import { expect } from 'chai';

describe('Counting book-info divs', function() {
  let driver;

  before(async function() {
    this.timeout(10000); 
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('');
  });

  after(async function() {
    this.timeout(10000); 
    await driver.quit(); 
  });

  it('should find and count all elements with class "book-info"', async function() {
    const bookInfoDivs = await driver.findElements(By.className('book-info'));
    const count = bookInfoDivs.length;
    expect(count).to.equal(15);
  });

});
