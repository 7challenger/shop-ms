import fetch from 'node-fetch';
import type { RequestInit, Response } from 'node-fetch';

import type { RestConnectionHandlerArgs, RestReturnType } from './types';
import type { ServicesGraphNode } from '../graph/types';
import { mixinHeaders, defaultHeaders, ContentType } from './headers';

const rest = async ({
  uri,
  connectionOptions,

  nextCallback,
  errorCallback,
}: RestConnectionHandlerArgs): RestReturnType => {
  return fetch(uri, connectionOptions)
    .then(nextCallback)
    .catch(errorCallback);
};

export const getPostOptions = (jsonBody: Record<any, any>): RequestInit => {
  const body = JSON.stringify(jsonBody);
  const XFromHeader = { 'X-From-Request': '' };

  return {
    body,
    method: 'POST',

    headers: mixinHeaders(defaultHeaders, [ContentType, XFromHeader]),
  };
};

const restDataAggregator = (
  data: Record<any, any>,
  service: ServicesGraphNode
): RestConnectionHandlerArgs => {
  const restArgs: RestConnectionHandlerArgs = {
    uri: service.serviceHost,
    connectionOptions: getPostOptions(data),

    nextCallback: (resp: Response) => resp.json(),
    errorCallback: console.log,
  };

  return restArgs;
};

const restObject = {
  handler: rest,
  aggregator: restDataAggregator,
};

export default restObject;
