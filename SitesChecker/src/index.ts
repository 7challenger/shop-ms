import helmet from 'helmet';
import express from 'express';
import cheerio from 'cheerio';
import bodyParser from 'body-parser';

import puppeteer from 'puppeteer-core';

import updateSelectors from './utils/updateSelectors';
import initBrowserSession from './utils/initBrowserSession';
import getHasMarkupChanged from './utils/getHasMarkupChanged';
import { flowedNormalize } from './utils/normalizeHtml';

const port = 3003;
const app = express();

app.use(helmet());
app.use(bodyParser.json());

type SelectorItem = {
  selector: string,
  cssClass: string,

  dataTest?: string,
};

type Selectors = { item: SelectorItem }
type Site = { siteUrl: string, prevSiteState: string, selectors: Selectors }

const getRequestData = (req: express.Request): Site => {
  const { siteUrl, prevSiteState, selectors } = req.body;

  return { siteUrl, prevSiteState, selectors };
};

app.post('/sites-checker', async (req, res) => {
  let outerBrowser: puppeteer.Browser | null = null;

  try {
    let { selectors } = getRequestData(req);
    const { siteUrl, prevSiteState } = getRequestData(req);

    console.log('Request to: /sites-checker, request data:', getRequestData(req));

    const { page, browser } = await initBrowserSession(siteUrl);
    outerBrowser = browser;

    const currentSiteState = await page.content();
    const currentPageSelector = flowedNormalize(cheerio.load(currentSiteState));
    const prevPageSelector = flowedNormalize(cheerio.load(prevSiteState));

    const hasMarkupChanged = await getHasMarkupChanged(currentPageSelector, prevPageSelector);

    if (hasMarkupChanged) {
      selectors = await updateSelectors(currentPageSelector, prevPageSelector, selectors);
    }

    await page.close();
    await browser.close();

    res.json({ selectors, siteUrl, currentSiteState });
  } catch(e) {
    await outerBrowser?.close();
    res.status(400).json({ error: e });
  } finally {
    await outerBrowser?.close();
  }
});

app.use((req, res) => {
  res.status(404).json({ error: '404 from sites-checker' });
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

