import fetch from 'node-fetch';
import type { Response } from 'node-fetch';
import type {
  Response as ExpressResponse,
  Request as ExpressRequest,
} from 'express';

import { getSites } from '../mocks';
import type { Site } from '../mocks';

import { Item } from '../Models/Item';
import type { ItemAttributesJSON } from '../Models/Item';

import { getRestServicesPipeline } from '../servicesAggreator';
import { getPostOptions } from '../servicesAggreator/connectionHandlers/rest';

import type { RestConnectionHandlerArgs } from '../servicesAggreator/connectionHandlers/types';
import { ServicesGraph } from 'servicesAggreator/graph/types';

// TODO!
const ConfigProviderUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3005/config-provider/'
  : 'http://chabox/config-provider/';

let restServicesAggregatorOuter: any = undefined;
let loadedServices: ServicesGraph | undefined = undefined;

const loadServices = async () => {
 const configResp = await fetch(ConfigProviderUrl);
 const { services } = await configResp.json();

 loadedServices = services;
 restServicesAggregatorOuter = getRestServicesPipeline(services);
};

const firstAggregate = (site: Site) => {
  const services = loadedServices as ServicesGraph;

  const restArgs: RestConnectionHandlerArgs = {
    // eslint-disable-next-line
    uri: services.serviceHost,
    connectionOptions: getPostOptions(site),

    nextCallback: (resp: Response) => resp.json(),
    errorCallback: console.log,
  };

  return restServicesAggregatorOuter(restArgs);
};

const saveParsedData = (data: ItemAttributesJSON[]) => {
  data.map((item: ItemAttributesJSON) => {
    Item.create({
      siteUrl: item.siteUrl,
      image: item.image,

      name: item.info.name,
      description: item.info.description,

      currentPrice: item.price.currentPrice,
      initialPrice: item.price.initialPrice,
    });
  });
};

const method = 'post' as const;
const url = '/api/start-parsing/';
const handler = async (_: ExpressRequest, res: ExpressResponse): Promise<any> => {
  await loadServices();

  const sites = getSites();
  const dataToSend = await Promise.all(sites.map(firstAggregate));

  res.json(dataToSend);

  saveParsedData(dataToSend);
};

const ItemsParserController = {
  url,
  method,
  handler,
};

export default ItemsParserController;
