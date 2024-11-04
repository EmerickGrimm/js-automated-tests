import { describe, before, after, afterEach, it } from 'mocha';
import { Builder, By, Key, until } from 'selenium-webdriver';
import { expect } from 'chai';


describe('Finding elements on a web page', function() {
  let driver;
  

  before(async function() {
    this.timeout(30000);
      driver = await new Builder().forBrowser('chrome').build();
      await driver.get('');
  });

  after(async function() {
    await driver.quit(); 
  });

  it('should find the "Feedback" link at the bottom of the page', async function() {

    const feedbackLink = await driver.findElement(By.linkText('Обратная связь'));
    expect(await feedbackLink.isDisplayed()).to.be.true;
  });

  it('should find the "Preorders" link at the bottom of the page', async function() {
    this.timeout(30000); 

    const preorderLink = await driver.findElement(By.linkText('Предзаказы'));
    expect(await preorderLink.isDisplayed()).to.be.true;
  });

  it('should find the "Add to Cart" button for the first book', async function() {
    this.timeout(30000); 

    const addToCartButton = await driver.findElement(By.css('.book-add'));
    expect(await addToCartButton.isDisplayed()).to.be.true;
  });

  it('should find the number of items in the cart icon', async function() {
    this.timeout(30000); 

    const cartItemCount = await driver.findElement(By.id('cart_count'));
    expect(await cartItemCount.isDisplayed()).to.be.true;
  });

  it('should find the "Genres" menu item', async function() {
    this.timeout(30000); 

    const genresMenuItem = await driver.findElement(By.id('genres'));
    expect(await genresMenuItem.isDisplayed()).to.be.true;
  });

  it('should find the search input field for the store', async function() {
    this.timeout(30000); 

    const searchInputField = await driver.findElement(By.id('search-input'));
    expect(await searchInputField.isDisplayed()).to.be.true;
  });
});
