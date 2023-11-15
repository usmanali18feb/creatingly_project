const { chromium } = require('playwright');

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
          await page.waitForSelector(nextButtonSelector, { timeout: extendedTimeout });

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
    await page.click(chartSelector);

    // Introduce a time delay of 2000 milliseconds (2 seconds)
    await page.waitForTimeout(2000);

    // Wait for the element with the specified src attribute to be present
    const imgSelector = 'img[src="https://dev-cdn.platform.creatingly.com/s3/dev-desktop-elements/2703c987-4a8a-48fd-be7a-02dbb88500b8/Bar Chart.svg"]';
    await page.waitForSelector(imgSelector, { timeout: 60000 });

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
    await page.waitForSelector(justifySelector, { timeout: 60000 });

    // Click on the img element
    await page.click(justifySelector);

    // Introduce a time delay of 2000 milliseconds (2 seconds)
    await page.waitForTimeout(2000);

    // Wait for the button element to be present
    const buttonSelector = 'button.btn:has-text("C | C")';
    await page.waitForSelector(buttonSelector, { timeout: 60000 });

    // Click on the button element
    await page.click(buttonSelector);

    // Introduce a time delay of 2000 milliseconds (2 seconds)
    await page.waitForTimeout(2000);

    // Wait for the element with the specified text "Stretch vertically" to be present
    await page.waitForSelector('span:has-text("Stretch vertically")', { timeout: 60000 });

    // Click on the element
    await page.click('span:has-text("Stretch vertically")');

    // Introduce a time delay of 2000 milliseconds (2 seconds)
    await page.waitForTimeout(2000);

    // Wait for the element with the specified text "Stretch horizontally" to be present
    await page.waitForSelector('span:has-text("Stretch horizontally")', { timeout: 60000 });

    // Click on the element
    await page.click('span:has-text("Stretch horizontally")');

    // Introduce a time delay of 6000 milliseconds (6 seconds)
    await page.waitForTimeout(6000);

    // Wait for the li element with the specified data-title attribute to be present
    const liSelector = 'li[data-title="Preview"]';
    await page.waitForSelector(liSelector, { timeout: 60000 });

    // Click on the li element
    await page.click(liSelector);

    // Introduce a time delay of 10000 milliseconds (10 seconds)
    await page.waitForTimeout(10000);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the browser
    if (browser) {
      await browser.close();
    }
  }
})();

