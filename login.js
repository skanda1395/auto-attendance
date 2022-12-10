const puppeteer = require('puppeteer'); 
const { HOST } = require("./config");
const CronJob = require('cron').CronJob;
const WEEKDAYS = "0 10 * * 1-5";
const CUSTOM = "10 15 * * 1-5";
require('dotenv').config();

async function signIn() {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Login
    await page.goto(HOST);
    await page.waitForSelector("#username");
    await page.type("#username", process.env.AA_USERNAME);
    await page.type("#password", process.env.AA_PASSWORD);
    await page.click('[type="submit"]');

    // Sign In / Sign Out
    await page.waitForSelector('div.btn-container');
    await page.$eval('gt-attendance-info gt-button', btn => btn.click());
  } catch(err) {
    console.log("Error:", err);
  }
};

const job = new CronJob(WEEKDAYS, signIn, null, false, "Asia/Kolkata");

module.exports = job;