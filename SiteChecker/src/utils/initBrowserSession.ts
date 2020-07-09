import puppeteer from 'puppeteer-core';

type BrowserSession = { page: puppeteer.Page, browser: puppeteer.Browser }

const initBrowserSession = async (url: string): Promise<BrowserSession> => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    executablePath: process.env.CHROME_BIN,
    args: [
      `--no-sandbox`,
      '--window-position=0,0',
    ],
  });

  const [page] = await browser.pages();
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  return { page, browser };
}

export default initBrowserSession;
