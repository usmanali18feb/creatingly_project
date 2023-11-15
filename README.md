Prerequisites
Node.js installed
Playwright library installed: npm install playwright

Running the Script
Navigate to the project directory: cd creatingly_project
Run the script: node webstudio_automate.js


Script Details
The script does the following:

Launches a new Chromium browser instance.
Navigates to the Designstudio board on the specified URL.
Implements a retry mechanism for the "Next" button, clicking it four times.
Clicks on the "Chart" element after a timeout.
Waits for specific images and elements to be present, clicking them sequentially.
Introduces time delays for better synchronization.


Note: In my code, I've incorporated both positive and negative test cases, managing them through if and else assertions. However, it's essential to note that the login scenario cannot be fulfilled due to the inclusion of bot detection measures on the login page.
