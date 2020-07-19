import type { HeadersInit } from 'node-fetch';


export const defaultHeaders = {};

export const ContentType = { 'Content-Type': 'application/json' };

export const mixinHeader = (headers: HeadersInit, headerToMixin: HeadersInit): HeadersInit => {
  return {
    ...headers,
    ...headerToMixin
  };
};

export const mixinHeaders = (headers: HeadersInit, headersToMixin: HeadersInit[]): HeadersInit => {
  return headersToMixin.reduce((acc, header) => {
    return mixinHeader(acc, header);
  }, headers);
};
