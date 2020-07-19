import * as pg from 'pg';
import { Sequelize, DataTypes } from 'sequelize';

import initializeItemModel from './Item';

const modelsIniatializers = [
  initializeItemModel,
];

type Model = { name: string, associate?: (db: DBModels) => any };
export type DBModels = { [k: string]: Model };

const initModelsSync = async (db: DBModels, sequelize: Sequelize) => {
  return Promise.all(
    modelsIniatializers.map((initFunc) => {
      const model: Model = initFunc(sequelize, DataTypes);

      db[model.name] = model;
    })
  );
};

const initAssosciationsModels = (db: DBModels) => {
  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      // @ts-ignore
      db[modelName].associate(db);
    }
  });
};

export type IDb = {
  db: DBModels,
  sequelize: Sequelize,
};

export const initializeModels = async (): Promise<IDb> => {
  const db: DBModels = {};

  const sequelize = new Sequelize('challenger', 'challenger', 'challenger', {
    host: 'postgres',
    dialect: 'postgres',
    port: 5432,
    logging: (...msg) => console.log(msg),
    dialectModule: pg,
  });

  await initModelsSync(db, sequelize);
  initAssosciationsModels(db);

  return { db, sequelize };
};
