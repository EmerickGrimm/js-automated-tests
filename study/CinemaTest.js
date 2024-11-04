import { describe, before, after, it } from 'mocha';
import { Builder, By, until } from 'selenium-webdriver';
import { assert } from 'chai';

describe.only('Test Form Submission', function () {
    let driver;

    before(async function () {
        this.timeout(30000); 

        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function () {
        await driver.quit();
    });

    async function submitForm(films, serials) {
        await driver.findElement(By.id('films')).sendKeys(films);
        await driver.findElement(By.id('serials')).sendKeys(serials);
        await driver.findElement(By.id('save')).click();
        await driver.findElement(By.id('two')).click();
        await driver.findElement(By.css('[data-page="2"]')).click();
        await driver.findElement(By.id('ok')).click();
        await driver.wait(until.elementLocated(By.id('best_films')), 5000);
        await driver.wait(until.elementLocated(By.id('best_serials')), 5000);
        const bestFilmsText = await driver.findElement(By.id('best_films')).getText();
        const bestSerialsText = await driver.findElement(By.id('best_serials')).getText();
        return { bestFilmsText, bestSerialsText };
    }

    it('should clear input field when delete button is clicked', async function () {
        this.timeout(30000);

        try {
            await driver.get('');

            const filmsInput = await driver.findElement(By.id('films'));
            await filmsInput.sendKeys('Some text');

            const filmsDeleteButton = await driver.findElement(By.css('#films + .delete'));
            await filmsDeleteButton.click();

            const filmsInputValue = await filmsInput.getAttribute('value');
            assert.equal(filmsInputValue, '');

            const serialsInput = await driver.findElement(By.id('serials'));
            await serialsInput.sendKeys('Some text');
            const serialsDeleteButton = await driver.findElement(By.css('#serials + .delete'));
            await serialsDeleteButton.click();
            const serialsInputValue = await serialsInput.getAttribute('value');
            assert.equal(serialsInputValue, '');
        } catch (error) {
            console.error('Test failed:', error);
            throw error;
        }
    });

    const testData = [
        { films: 'Pulp Fiction', serials: 'Stranger Things' },
        { films: '}{отт@бь)ч', serials: '}{отт@бь)ч_|3Ut_$3R€$' },
        { films: '9', serials: '123' }
    ];

    testData.forEach(({ films, serials }, index) => {
        it(`Test ${index + 1}: should submit form with films "${films}" and serials "${serials}"`, async function () {
            this.timeout(30000);

            try {
                await driver.get('');
                const { bestFilmsText, bestSerialsText } = await submitForm(films, serials);
                assert.equal(bestFilmsText, films);
                assert.equal(bestSerialsText, serials);
            } catch (error) {
                console.error(`Test ${index + 1} failed:`, error);
                throw error;
            }
        });
    });

});
