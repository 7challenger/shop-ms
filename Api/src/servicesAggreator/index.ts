import {
  traverseGraphInDepth,
  pickDistributedDataFromNode,
} from './graph/graphUtils';
import type { ServicesGraph, ServicesGraphNode, ServicesGraphGetter } from './graph/types';

import {
  DataAggregator,

  ConnectionHandler,
  AbstractConnectionHandlerArgs,
} from './connectionHandlers/types';

import { REST, getConnectionHandlerFromMap } from './connectionHandlers/connnectionHandlersMap';
import type { ConnectionHandlersMapKeys } from './connectionHandlers/connnectionHandlersMap';

type AggregateServicesAsFunction<T> = (entryHandlerArgs: T) => Promise<any>

const aggregateServices = <T extends AbstractConnectionHandlerArgs>(
  servicesGraph: ServicesGraph,
  connectionHandler: ConnectionHandler<T>,
  dataAggregator: DataAggregator<T>,
): AggregateServicesAsFunction<T> => {
  const spreadedServices = traverseGraphInDepth(servicesGraph);

  const aggregateServicesAsFunction = (entryHandlerArgs: T) => {
    const aggregatedPromise: Promise<any> = new Promise(() => {});

    return spreadedServices.reduce((acc: Promise<any>, service: ServicesGraphNode, index: number) => {
      if (index === 0) {
        return connectionHandler(entryHandlerArgs);
      }

      return acc.then((data) => {
        const distributedData = pickDistributedDataFromNode(data, service);
        const handlerArgs = dataAggregator(distributedData, service);

        return connectionHandler(handlerArgs);
      });
    }, aggregatedPromise);
  };

  return aggregateServicesAsFunction;
};

const getSPCarriedByConnectionHandler = <T extends AbstractConnectionHandlerArgs>(
  connectionHandlerAsString: ConnectionHandlersMapKeys,
) => {
  return (servicesGraph: ServicesGraph | ServicesGraphGetter): AggregateServicesAsFunction<T> => {
    const {
      handler,
      aggregator,
    } = getConnectionHandlerFromMap(connectionHandlerAsString);

    return getServicesPipeline(servicesGraph, handler, aggregator);
  };
};

const getServicesPipeline = <T extends AbstractConnectionHandlerArgs>(
  servicesGraph: ServicesGraph | ServicesGraphGetter,
  connectionHandler: ConnectionHandler<T>,
  dataAggregator: DataAggregator<T>,
): AggregateServicesAsFunction<T> => {
  const servicesToUse = typeof servicesGraph === 'function'
    ? servicesGraph()
    : servicesGraph;

  return aggregateServices(servicesToUse, connectionHandler, dataAggregator);
};

export const getRestServicesPipeline =
  getSPCarriedByConnectionHandler(REST);
export default getServicesPipeline;
