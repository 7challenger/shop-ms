import amqp from 'amqplib/callback_api';

import logger from 'Utils/logger-ax';
import initService from 'Utils/initService';
import resolveOnDrain from 'Utils/resolveOnDrain';

import type { EnvConfig } from 'Utils/getEnvConfig';


type Sites = { [key: string]: string }

const sites: Sites = {
  farfetchMenSale: 'https://www.farfetch.com/ru/shopping/men/sale/all/items.aspx',
  farfetchWomenSale: 'https://www.farfetch.com/ru/shopping/women/sale/all/items.aspx',
};

const getSendData = (connection: amqp.Connection, channel: amqp.Channel, envConfig: EnvConfig) => {
  const sendData = async (key: string) => {
    const data = JSON.stringify({
      name: key,
      url: sites[key],
    });

    const sendResult =
      channel.sendToQueue(envConfig.rabbit.sitesQueue.name, Buffer.from(data));

    if (!sendResult) {
      await resolveOnDrain(channel, connection);
    }
  };

  return sendData;
};

const onCreateChannelCall =
  async (connection: amqp.Connection, channel: amqp.Channel, envConfig: EnvConfig) => {
    channel.assertQueue(
      envConfig.rabbit.sitesQueue.name,
      envConfig.rabbit.sitesQueue.opts,
    );
    await logger.log('queue asserted', serviceName);

    const sendData = getSendData(connection, channel, envConfig);
    Object.keys(sites).forEach(sendData);

    await logger.log(['sites sents', sites], serviceName);
  };

const serviceName = 'ParsersGateway';
const ParsersGateway = initService({ onCreateChannelCall, serviceName });

export default ParsersGateway;
