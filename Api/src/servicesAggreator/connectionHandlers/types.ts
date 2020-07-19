import type { RequestInfo, Response, FetchError, RequestInit } from 'node-fetch';
import { ServicesGraphNode } from 'servicesAggreator/graph/types';

export interface AbstractConnectionHandlerArgs {
  uri: any;
  connectionOptions?: any;

  nextCallback: (...args: any) => any;
  errorCallback?: (...args: any) => any;
}

export type ConnectionHandler<T extends AbstractConnectionHandlerArgs> =
  (connectionHandlerArgs: T) => ReturnType<T['nextCallback']> | Promise<ReturnType<T['nextCallback']>>;

export type DataAggregator<T extends AbstractConnectionHandlerArgs> =
  (returnedData: Partial<T>, service: ServicesGraphNode) => T;

export interface RestConnectionHandlerArgs extends AbstractConnectionHandlerArgs {
  uri: RequestInfo;
  connectionOptions?: RequestInit;

  nextCallback: (response: Response) => any;
  errorCallback?: (error: FetchError) => any;
}

export type RestReturnType = Promise<ReturnType<RestConnectionHandlerArgs['nextCallback']>>
