const { chromium } = require('playwright');
const { expect } = require('@playwright/test');

(async () => {
  let browser;

  try {
    // Launch a new browser instance
    browser = await chromium.launch({ headless: false }); // Set headless to false for debugging

    // Create a new context
    const context = await browser.newContext();

    // Create a new page
    const page = await context.newPage();

    // Maximize the browser window
    await page.setViewportSize({ width: 1280, height: 768 }); // Set your desired width and height

    // Navigate to the Designstudio board
    await page.goto('https://dev.platform.creatingly.com/webstudio', { timeout: 600000 }); // Set a longer timeout, e.g., 600 seconds

    console.log('Browser launched successfully.');

    // Extend the timeout for waitForSelector
    const extendedTimeout = 15000; // Set your desired extended timeout

    // Implement a retry mechanism for waitForSelector
    const maxRetries = 2;
    const nextButtonSelector = '.next-button';

    for (let i = 0; i < 4; i++) {
      let retries = 0;

      while (retries < maxRetries) {
        try {
          // Wait until the element with class 'next-button' is present
          const isNextButtonPresent = await page.waitForSelector(nextButtonSelector, { timeout: extendedTimeout });
          expect(isNextButtonPresent).toBeTruthy();

          // Click on the next button
          console.log(`Clicking on the next button (${i + 1} of 4)...`);
          await page.click(nextButtonSelector);

          // Break out of the loop if successful
          break;
        } catch (error) {
          console.error(`Attempt ${retries + 1} failed. Retrying...`);
          retries++;
        }
      }
    }

    // Introduce a time delay of 2000 milliseconds (2 seconds)
    await page.waitForTimeout(2000);

    // Click on the element with the specified text "Chart"
    const chartSelector = 'p.element-box-test:has-text("Chart")';
    const isChartClickable = await page.waitForSelector(chartSelector, { timeout: 5000 });
    expect(isChartClickable).toBeTruthy();
    if (isChartClickable) {
      await page.click(chartSelector);
    } else {
      console.error('Chart element not clickable.');
    }

    // Introduce a time delay of 2000 milliseconds (2 seconds)
    await page.waitForTimeout(2000);

    // Wait for the element with the specified src attribute to be present
    const imgSelector = 'img[src="https://dev-cdn.platform.creatingly.com/s3/dev-desktop-elements/2703c987-4a8a-48fd-be7a-02dbb88500b8/Bar Chart.svg"]';
    const isImagePresent = await page.waitForSelector(imgSelector, { timeout: 60000 });
    expect(isImagePresent).toBeTruthy();
    if (isImagePresent) {
      // Click on the element using JavaScript to bypass event interception
      await page.evaluate((selector) => {
        const element = document.querySelector(selector);
        if (element) {
          element.click();
        }
      }, imgSelector);

      // Introduce a time delay of 2000 milliseconds (2 seconds)
      await page.waitForTimeout(2000);

      // Wait for the img element with the specified src attribute to be present
      const justifySelector = 'img[src="https://dev-cdn.platform.creatingly.com/s3/template-svg/icons/zoomfittoall.svg"]';
      const isJustifyImagePresent = await page.waitForSelector(justifySelector, { timeout: 60000 });
      expect(isJustifyImagePresent).toBeTruthy();
      if (isJustifyImagePresent) {
        // Click on the img element
        await page.click(justifySelector);

        // Introduce a time delay of 2000 milliseconds (2 seconds)
        await page.waitForTimeout(2000);

        // Wait for the button element to be present
        const buttonSelector = 'button.btn:has-text("C | C")';
        const isButtonPresent = await page.waitForSelector(buttonSelector, { timeout: 60000 });
        expect(isButtonPresent).toBeTruthy();
        if (isButtonPresent) {
          // Click on the button element
          await page.click(buttonSelector);

          // Introduce a time delay of 2000 milliseconds (2 seconds)
          await page.waitForTimeout(2000);

          // Wait for the element with the specified text "Stretch vertically" to be present
          const stretchVerticalSelector = 'span:has-text("Stretch vertically")';
          const isStretchVerticalPresent = await page.waitForSelector(stretchVerticalSelector, { timeout: 60000 });
          expect(isStretchVerticalPresent).toBeTruthy();
          if (isStretchVerticalPresent) {
            // Click on the element
            await page.click(stretchVerticalSelector);

            // Introduce a time delay of 2000 milliseconds (2 seconds)
            await page.waitForTimeout(2000);

            // Wait for the element with the specified text "Stretch horizontally" to be present
            const stretchHorizontalSelector = 'span:has-text("Stretch horizontally")';
            const isStretchHorizontalPresent = await page.waitForSelector(stretchHorizontalSelector, { timeout: 60000 });
            expect(isStretchHorizontalPresent).toBeTruthy();
            if (isStretchHorizontalPresent) {
              // Click on the element
              await page.click(stretchHorizontalSelector);

              // Introduce a time delay of 6000 milliseconds (6 seconds)
              await page.waitForTimeout(6000);

              // Wait for the li element with the specified data-title attribute to be present
              const liSelector = 'li[data-title="Preview"]';
              const isLiElementPresent = await page.waitForSelector(liSelector, { timeout: 60000 });
              expect(isLiElementPresent).toBeTruthy();
              if (isLiElementPresent) {
                // Click on the li element
                await page.click(liSelector);

                // Introduce a time delay of 10000 milliseconds (10 seconds)
                await page.waitForTimeout(10000);
              } else {
                console.error('"Preview" li element not present.');
              }
            } else {
              console.error('"Stretch horizontally" element not present.');
            }
          } else {
            console.error('"Stretch vertically" element not present.');
          }
        } else {
          console.error('Button not present.');
        }
      } else {
        console.error('Justify image not present.');
      }
    } else {
      console.error('Image not present.');
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the browser
    if (browser) {
      await browser.close();
    }
  }
})();
