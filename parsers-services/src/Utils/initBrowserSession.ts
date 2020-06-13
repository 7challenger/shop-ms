import puppeteer from 'puppeteer';
import logger from './logger-ax';


type BrowserSession = {
  page: puppeteer.Page,
  browser: puppeteer.Browser,
  screenShot: string,
}

const serviceName = 'SiteChecker::Puppeteer';
const initBrowserSession = async (siteName: string): Promise<BrowserSession> => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    executablePath: process.env.CHROME_BIN,
    args: ['--no-sandbox'],
  });

  const [page] = await browser.pages();
  await logger.log(['browser created; going to', siteName], serviceName)

  const now = Date.now();
  await page.goto(siteName, {  waitUntil: 'networkidle0', timeout: 0 });
  await logger.log(
    ['navigated to', siteName, `navigation took ${(now - Date.now()) / 1000} ms`],
    serviceName,
  );

  const screenShot = await page.screenshot({ encoding: 'base64', fullPage: true });

  return { browser, page, screenShot };
};

export default initBrowserSession;
