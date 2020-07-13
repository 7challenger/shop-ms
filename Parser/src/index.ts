import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';

const port = 3004;
const app = express();

app.use(helmet());
app.use(bodyParser.json())

const getRequestData = (req: express.Request) => {
  const { siteUrl, selectors } = req.body;
  return { siteUrl, selectors };
}

import puppeteer from 'puppeteer-core';

type BrowserSession = { page: puppeteer.Page, browser: puppeteer.Browser }

const initBrowserSession = async (url: string): Promise<BrowserSession> => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    executablePath: process.env.CHROME_BIN,
    args: [
      '--no-sandbox',
      '--window-position=0,0',

      // need to rotate user-agent
      '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
    ],
  });

  const [page] = await browser.pages();
  await page.setViewport({
    width: 1200,
    height: 800
  });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });
  await autoScroll(page);

  return { page, browser };
}

type Info = {
  name: string,
  description: string,
};

type Price = {
  initialPrice: string,
  currentPrice: string,
}

type SelectorItem = {
  self: string,

  info: Info,
  image: string,
  price: Price,
};
type Selectors = { item: SelectorItem }
type Item = { image: string, price: string, info: Info };

const autoScroll = async (page: puppeteer.Page) => {
  await page.evaluate(`(async () => {
    const delay = (ms) => {
      return new Promise(resolve => {
        setTimeout(resolve, ms);
      });
    };

    await new Promise(async (resolve, reject) => {
      let totalHeight = 0;
      const distance = 200;

      const scrollHeight = document.body.scrollHeight * 2;

      while (totalHeight < scrollHeight) {
        window.scrollBy(0, distance);
        await delay(100);
        totalHeight += distance;
      }

      resolve();
    });
  })()`);
}

const parseElementBySelector = async (
  page: puppeteer.Page,
  selfElement: puppeteer.ElementHandle,
  selector: string,

  valueToTake: string = 'textContent',
) => {
  const element = await selfElement.$(selector);
  const value = await page.evaluate((element, valueToTake) => element && element[valueToTake], element, valueToTake);

  return value;
};

const parse = async (page: puppeteer.Page, selectors: Selectors, siteUrl: string) => {
  const elements = await page.$$(selectors.item.self);

  const items = await Promise.all(
    elements.map(async (element) => {
      const image = await parseElementBySelector(page, element, selectors.item.image, 'src');

      const initialPrice = await parseElementBySelector(page, element, selectors.item.price.initialPrice);
      const currentPrice = await parseElementBySelector(page, element, selectors.item.price.currentPrice);

      const infoName = await parseElementBySelector(page, element, selectors.item.info.name);
      const infoDescription = await parseElementBySelector(page, element, selectors.item.info.description);

      const info = { name: infoName, description: infoDescription };
      const price = { initialPrice, currentPrice };

      return { siteUrl, image, price, info };
    })
  );

  return items;
};

app.post('/parser', async (req, res) => {
  const { siteUrl, selectors } = getRequestData(req);
  const { page, browser } = await initBrowserSession(siteUrl);
  console.log('Request to: /parser, request data:', getRequestData(req));
  try {
    const items: any[] = await parse(page, selectors, siteUrl);

    await page.close();
    await browser.close();

    res.send({ items });
  } catch(e) {
    await browser.close();
  } finally {
    await browser.close();
  }
});

app.use((req, res, next) => {
  res.send('404 from parser');
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
