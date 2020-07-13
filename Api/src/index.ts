import pg from 'pg';
import helmet from 'helmet';
import express from 'express';

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
  const host = process.env.NODE_HOST;
  // host should start with http(s)://hostname
  // mock from infra-admin-db || from traefik api
  // curl http://chabox.ru:8080/api/http/routers
  // fitler name by @docker
  // process

  // prod -> chabox
  // dev-compose  -> compose network_name
  const MSHosts = {
    parser: `${host}/parser`,
    process: `${host}/site-checker`,
    normalize: `${host}/normalize`,
  };

  return MSHosts;
};

const fetchPostReqPipe = (valuesToMap: any[], hostToPost: string) => {
  return Promise.all(valuesToMap.map((valueFromArray) => {
    const body = JSON.stringify(valueFromArray);

    return fetch(hostToPost, { method: 'POST', body, headers: { 'Content-Type': 'application/json' } })
      .then(response => response.json());
  }));
};

const saveParsedData = async (data: SelectorItem[]) => {
  const client = new pg.Client({
    user: 'challenger',
    host: 'localhost',
    database: 'challenger',
    password: 'challenger',
    port: 5432,
  });

  await client.connect();
  console.log(await client.query('SELECT * FROM challenger'))
  // connect to postgre
  // save data
  // disconnect?
};

// move to ws
app.post('/api/start-parsing', async (_, res) => {
  const sites = await getSites();
  const MSHosts = await getMSHosts();

  const processedData = await fetchPostReqPipe(Object.values(sites), MSHosts.process);
  const data = await fetchPostReqPipe(processedData, MSHosts.parser);
  saveParsedData(data);

  res.send(data);
});

app.use((req, res, next) => {
  res.send('404 from api');
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
