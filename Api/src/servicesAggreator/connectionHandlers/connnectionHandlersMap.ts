import rest from './rest';
import type { ConnectionHandler, AbstractConnectionHandlerArgs, DataAggregator } from './types';

export const REST = 'REST';
export const connectionHandlersMap = {
  [REST]: rest,
};

export type ConnectionHandlersMapKeys = keyof typeof connectionHandlersMap;
type ConnectionHandlersMapValues<T extends AbstractConnectionHandlerArgs> = {
  handler: ConnectionHandler<T>,
  aggregator: DataAggregator<T>,
};

export const getConnectionHandlerFromMap = <T extends AbstractConnectionHandlerArgs>(
  connectionHandlerAsString: ConnectionHandlersMapKeys,
): ConnectionHandlersMapValues<T> => {
  // @ts-ignore
  return connectionHandlersMap[connectionHandlerAsString];
};
