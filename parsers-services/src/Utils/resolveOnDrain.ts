import amqp from 'amqplib/callback_api';
import logger from './logger-ax';


const onQueueDrain = async (connection: amqp.Connection) => {
  await logger.log('queue drained', serviceName);
  connection.close();
  process.exit(0);
};

const serviceName = 'ParsersGateway';

const resolveOnDrain =
  async (channel: amqp.Channel, connection: amqp.Connection): Promise<void> => {
    return new Promise(resolve => channel.once('drain', () => {
      resolve();
      onQueueDrain(connection);
    }))
  }


export default resolveOnDrain;
