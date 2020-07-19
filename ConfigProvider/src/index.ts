import express from 'express';
import helmet from 'helmet';

const port = 3005;
const app = express();

app.use(helmet());

export type Hosts = { [k: string]: string };

const HostNotProvidedError = new Error('HostNotProvidedError');
export const getMSHosts = (): Promise<Hosts> => {
  const env = process.env.NODE_ENV;
  if (env === 'development') {
    const MSHosts = {
      parser: 'http://0.0.0.0:3004/parser',
      sitesChecker: 'http://0.0.0.0:3003/sites-checker',
      sitesUpdater: 'http://0.0.0.0:300N/sites-updater',
      normalize: 'http://0.0.0.0:300M/normalize',
      // dataPoster: '0.0.0.0:3000-checker',
    };

    return Promise.resolve(MSHosts);
  }

  // host should start with http(s)://hostname
  // mock from infra-admin-db || from traefik api
  // curl http://chabox.ru:8080/api/http/routers
  // fitler name by @docker
  // process

  // prod -> chabox
  // dev-compose  -> compose network_name

  const host = process.env.NODE_HOST;
  if (host) {
    const MSHosts = {
      parser: `${host}/parser`,
      sitesChecker: `${host}/sites-checker`,
      sitesUpdater: `${host}/sites-updater`,
      normalize: `${host}/normalize`,
      dataPoster: `${host}/sites-checker`,
    };

    return Promise.resolve(MSHosts);
  }

  throw HostNotProvidedError;
};


export const getServices = async (hosts: Hosts): Promise<any> => {
  const services = {
    serviceName: 'sites-checker',
    serviceHost: hosts.sitesChecker,
    // {
    //   serviceName: 'sites-updater',
    //   serviceHost: hosts.sitesUpdater,
    //   keysFromResponse: '*',
    // },
    nodes: [{
      serviceName: 'parser',
      serviceHost: hosts.parser,
      keysFromResponse: ['selectors', 'siteUrl'],
      // nodes: [{
      //   serviceName: 'data-poster',
      //   serviceHost: hosts.dataPoster,
      //   keysFromResponse: '*',
      // }]
    }],
  };

  return Promise.resolve(services);
};

app.get('/config-provider/', async (_, res) => {
  const hosts = await getMSHosts();
  const services = await getServices(hosts);

  res.json({ hosts, services });
});

app.use((req, res) => {
  res.status(404).json({ error: '404 from config-provider' });
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

