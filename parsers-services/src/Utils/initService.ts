import amqp from 'amqplib/callback_api';

import getEnvConfig, { EnvConfig } from 'Utils/getEnvConfig';
import validateError from 'Utils/validateError';
import resolveOnDrain from 'Utils/resolveOnDrain';


interface IParser {
  serviceName: string,
  onConnectCall?: (connection: amqp.Connection, envConfig: EnvConfig) => void,
  onCreateChannelCall?: (connection: amqp.Connection, channel: amqp.Channel, envConfig: EnvConfig) => void,
}

const defaultCall = () => {};

const initService = ({
  onConnectCall = defaultCall,
  onCreateChannelCall = defaultCall,
  serviceName
}: IParser) => () => {
  const envConfig = getEnvConfig();

  const getOnCreateChannelCb = (connection: amqp.Connection) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onCreateChannelCb = async (error: any, channel: amqp.Channel) => {
      await validateError(error, serviceName);
      onCreateChannelCall(connection, channel, envConfig);
    };

    return onCreateChannelCb;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onConnectCb = async (error: any, connection: amqp.Connection) => {
    await validateError(error, serviceName);
    onConnectCall(connection, envConfig);
    connection.createChannel(getOnCreateChannelCb(connection));
  };

  amqp.connect(envConfig.rabbit.host, onConnectCb);
};

export default initService;
