import graylog2 from 'graylog2';

const logger = new graylog2.graylog({
  servers: [{ host: '0.0.0.0', port: 12201 }],
  facility: 'services',
});

logger.on('error', (error) => {
  console.error('Error while trying to write to graylog2:', error);
});

export default logger;
