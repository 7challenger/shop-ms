export type Info = {
  name: string,
  description: string,
};

export type Price = {
  initialPrice: string,
  currentPrice: string,
}

export type SelectorItem = {
  self: string,
  siteUrl?: string,

  info: Info,
  image: string,
  price: Price,
};
export type Selectors = { item: SelectorItem }

export type Site = { siteUrl: string, prevSiteState: string, selectors: Selectors }

export type ParsedItem = {
  siteUrl: string,
  image: string,

  info: Info,
  price: Price,
};

export type InfoModel = {
  id: number,
  name: string,
  description: string,
};

export type PriceModel = {
  id: number,
  initialPrice: string,
  currentPrice: string,
};

export const getSites = (): Site[] => {
  const sites: Site[] = [
    {
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

    {
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

    {
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

    {
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
  ];

  return sites;
};
