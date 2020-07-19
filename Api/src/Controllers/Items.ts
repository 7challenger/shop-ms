import type {
  Response as ExpressResponse,
  Request as ExpressRequest,
} from 'express';

import { Item } from '../Models/Item';


const method = 'get' as const;
const url = '/api/items/';
const handler = async (_: ExpressRequest, res: ExpressResponse): Promise<any> => {
  // add pagination
  const dataToSend = await Item.findAll();
  res.json(dataToSend);
};

const ItemsController = {
  url,
  method,
  handler,
};

export default ItemsController;
