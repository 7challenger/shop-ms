import helmet from 'helmet';
import express, { response } from 'express';
import fetch from 'node-fetch';

const port = 3002;
const app = express();

app.use(helmet());

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

type Sites = { [k: string]: Site }
type Site = { siteUrl: string, prevSiteState: string, selectors: Selectors }

const getSites = async () => {
  const sites: Sites = {
    farfetchMenSale: {
      siteUrl: 'https://www.farfetch.com/ru/shopping/men/sale/all/items.aspx',
      selectors: {
        item: {
          self: '[data-test=productCard]',

          image: '[itemprop=image] > img',
          info: {
            name: '[data-test=productDesignerName]',
            description: '[data-test=productDescription]',
          },
          price: {
            initialPrice: '[data-test=initialPrice]',
            currentPrice: '[data-test=price]',
          },
        }
      },
      prevSiteState: '',
    },

    farfetchWomenSale: {
      siteUrl: 'https://www.farfetch.com/ru/shopping/women/sale/all/items.aspx',
      selectors: {
        item: {
          self: '[data-test=productCard]',

          image: '[itemprop=image] > img',
          info: {
            name: '[data-test=productDesignerName]',
            description: '[data-test=productDescription]',
          },
          price: {
            initialPrice: '[data-test=initialPrice]',
            currentPrice: '[data-test=price]',
          },
        }
      },
      prevSiteState: '',
    },

    luisaviaromaManSale: {
      siteUrl: 'https://www.luisaviaroma.com/en-ru/shop/men?lvrid=_gm_s',
      selectors: {
        item: {
          self: '[data-id=item]',

          image: '[itemprop=image]',
          info: {
            name: '[itemprop=brand] > [itemprop=name]',
            description: '[data-test=productDescription]',
          },
          price: {
            initialPrice: '[data-test=initialPrice]',
            currentPrice: '[data-test=price]',
          },
        }
      },
      prevSiteState: '',
    },

    asosManSale: {
      siteUrl: 'https://www.asos.com/ru/men/rasprodazha/cat/?cid=8409&ctaref=shop%7Csalehub%7Cviewallgreen&page=1',
      selectors: {
        item: {
          self: '[data-auto-id=productTile]',

          image: '[data-auto-id=productTileImage]',

          info: {
            name: '[data-auto-id=productTileDescription]',
            description: '[data-auto-id=productTileDescription]',
          },

          price: {
            initialPrice: '[data-auto-id=productTilePrice]',
            currentPrice: '[data-auto-id=productTileSaleAmount]',
          },
        }
      },
      prevSiteState: '',
    },
  };

  return sites;
};

const getMSHosts = async () => {
  // mock from infra-admin-db || from traefik api
  // curl http://chabox.ru:8080/api/http/routers
  // fitler name by @docker
  // process
  const MSHosts = {
    parser: 'http://localhost:3004/parser',
    process: 'http://localhost:3003/site-checker',
    normalize: 'http://chabox.ru/normalize',
  };

  return MSHosts;
};

// move to ws
app.post('/api/start', async (_, res) => {
  const sites = await getSites();
  const MSHosts = await getMSHosts();
  const promiseArr = Object.values(sites).map(({ siteUrl, prevSiteState, selectors }) => {
    const body = JSON.stringify({ siteUrl, prevSiteState, selectors });

    return fetch(MSHosts.process, { method: 'POST', body, headers: { 'Content-Type': 'application/json' } })
      .then(response => response.json())
      .then(json => {
        const body = JSON.stringify(json);
        return fetch(MSHosts.parser, { method: 'POST', body, headers: { 'Content-Type': 'application/json' } })
      })
      .then(response => response.json());
  });

  const data = await Promise.all(promiseArr);

  res.send(data);
});

app.use((req, res, next) => {
  res.send('404 from api');
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
