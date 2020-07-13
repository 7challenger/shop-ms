import helmet from 'helmet';
import express from 'express';
import cheerio from 'cheerio';
import bodyParser from 'body-parser';

import updateSelectors from './utils/updateSelectors';
import initBrowserSession from './utils/initBrowserSession';
import getHasMarkupChanged from './utils/getHasMarkupChanged';
import { flowedNormalize } from './utils/normalizeHtml';

const port = 3003;
const app = express();

app.use(helmet());
app.use(bodyParser.json())

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
}

app.post('/site-checker', async (req, res) => {
  let { selectors } = getRequestData(req);
  const { siteUrl, prevSiteState } = getRequestData(req);

  console.log('Request to: /site-checker, request data:', getRequestData(req));

  const { page, browser } = await initBrowserSession(siteUrl);

  try {
    const currentSiteState = await page.content();
    const currentPageSelector = flowedNormalize(cheerio.load(currentSiteState));
    const prevPageSelector = flowedNormalize(cheerio.load(prevSiteState));

    const hasMarkupChanged = await getHasMarkupChanged(currentPageSelector, prevPageSelector);

    if (hasMarkupChanged) {
      selectors = await updateSelectors(currentPageSelector, prevPageSelector, selectors);
    }

    await browser.close();
    res.send({ selectors, siteUrl });
  } catch(e) {
    await browser.close();
  } finally {
    await browser.close();
  }
});

app.use((req, res, next) => {
  res.send('404 from site-checker');
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

