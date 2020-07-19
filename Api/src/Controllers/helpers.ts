import type { Application, RequestHandler } from 'express';

type Method = 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';

export const use = (
  app: Application,
  method: Method | 'use',

  url: string,
  handler: RequestHandler,
): Application => {
  app[method](url, handler);

  return app;
};
