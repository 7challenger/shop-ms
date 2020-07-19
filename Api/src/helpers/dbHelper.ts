import type { Sequelize } from 'sequelize/types';

import { initializeModels } from '../Models';
import type { DBModels, IDb } from '../Models';

export type PreparedModels = {
  db: DBModels | undefined,
  sequelize: Sequelize | undefined,

  forceInitializeModels: () => Promise<any>,
};

export const doInitModels = (): PreparedModels => {
  let isInitialized = false;

  let db: DBModels | undefined = undefined;
  let sequelize: Sequelize | undefined = undefined;

  let promise: Promise<any>;
  try {
    promise = initializeModels().then((models: IDb) => {
      isInitialized = true;

      db = models.db;
      sequelize = models.sequelize;
    });
  } catch(e) {
    console.log(e);
  }

  const forceInitializeModels = async () => {
    if (isInitialized === false) {
      console.log('force initializing');

      try {
        await promise;
      } catch(e) {
        console.log(e);
      }
      isInitialized = true;
    }
  };

  return { forceInitializeModels, db, sequelize };
};
