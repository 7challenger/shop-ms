import amqp from 'amqplib/callback_api';

import logger from 'Utils/logger-ax';
import initService from 'Utils/initService';
import validateError from 'Utils/validateError';

import getSiteData from './utils/getSiteData';
import getHasMarkupChanged from './utils/getHasMarkupChanged';

import type { EnvConfig } from 'Utils/getEnvConfig';


const onMessage = async (msg: amqp.Message) => {
  try {
    const site = JSON.parse(msg.content.toString());

    const siteData = await getSiteData(site);
    const hasMarkupChanged = await getHasMarkupChanged(site, siteData);

    await logger.log(['onMessage parsing', site], serviceName);
  } catch (error) {
    await validateError(error, serviceName);
  }
};

const onCreateChannelCall =
  async (connection: amqp.Connection, channel: amqp.Channel, envConfig: EnvConfig) => {
    channel.assertQueue(
      envConfig.rabbit.sitesQueue.name,
      envConfig.rabbit.sitesQueue.opts,
    );

    await logger.log('queue asserted', serviceName);

    channel.consume(envConfig.rabbit.sitesQueue.name, onMessage, { noAck: true });
  }

const serviceName = 'SitesChecker';
const SiteChecker = initService({ serviceName, onCreateChannelCall });

export default SiteChecker;
