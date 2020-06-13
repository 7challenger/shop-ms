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
  rabbit: {
    host: string,
    sitesQueue: Queue,
  },

  mongo: {
    host: string,
    sitesDb: Database,
  },

  graylog: {
    host: string,
  }
}

const getEnvConfig = memoize((): EnvConfig => {
  const rabbit = {
    host: 'amqp://rabbitmq:5672',
    sitesQueue: {
      name: 'sites',
      opts: {},
    },
  };

  const mongo = {
    host: 'mongodb://mongodb:27017',
    sitesDb: {
      name: 'sites',
      opts: { useUnifiedTopology: true, useNewUrlParser: true },
    },
  };

  const graylog = {
    host: 'http://graylog:12201/gelf',
  }

  return {
    rabbit,
    mongo,
    graylog,
  };
});

export default getEnvConfig;
