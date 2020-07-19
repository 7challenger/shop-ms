import helmet from 'helmet';
import express from 'express';
import type { Application } from 'express';

import { doInitModels } from './helpers/dbHelper';

import { use } from './Controllers/helpers';
import Controllers from './Controllers/Controllers';

export const doInitApp = async (): Promise<Application> => {
  const { forceInitializeModels } = doInitModels();

  const port = 3002;
  const app = express();

  app.use(helmet());

  await forceInitializeModels();

  Controllers.forEach((controller) => {
    use(app, controller.method, controller.url, controller.handler);
  });

  app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
  return app;
};

doInitApp();
