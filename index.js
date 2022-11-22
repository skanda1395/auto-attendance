const puppeteer = require('puppeteer'); 
const { HOST } = require("./config");
require('dotenv').config();

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(HOST);
  await page.waitForSelector("#username");
  await page.type("#username", process.env.AA_USERNAME);
  await page.type("#password", process.env.AA_PASSWORD);
  await page.click('[type="submit"]');
})();
