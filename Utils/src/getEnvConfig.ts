import memoize from 'lodash/memoize';


type QueueOpts = {
  durable: boolean,
}

type Queue = {
  name: string,
  opts: Partial<QueueOpts>
}

type Database = {
  name: string,
  opts: Partial<DatabaseOpts>
}

type DatabaseOpts = {
  useNewUrlParser: boolean,
  useUnifiedTopology: boolean,
}

export type EnvConfig = {
  mongo: {
    host: string,
    sitesDb: Database,
  },
}

const getEnvConfig = memoize((): EnvConfig => {
  const mongo = {
    host: 'mongodb://mongodb:27017',
    sitesDb: {
      name: 'sites',
      opts: { useUnifiedTopology: true, useNewUrlParser: true },
    },
  };

  return {
    mongo,
  };
});

export default getEnvConfig;
