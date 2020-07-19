import { describe, expect, it } from '@jest/globals';
import { traverseGraphInDepth } from '../graph/graphUtils';

const services = {
  serviceName: 'sites-checker',
  serviceHost: '',
  nodes: [{
    serviceName: 'sites-updater',
    serviceHost: '',
    keysFromResponse: '*',
  }, {
    serviceName: 'parser',
    serviceHost: '',
    keysFromResponse: ['selectors', 'siteUrl'],
    nodes: [{
      serviceName: 'data-poster',
      serviceHost: '',
      keysFromResponse: '*',
    }]
  }],
};


describe('traverseGraphInDepth', () => {
  it('should convert from graph to flat array', () => {
    expect(traverseGraphInDepth(services)).toEqual([{
      serviceName: 'sites-checker',
      serviceHost: '',
    }, {
      serviceName: 'sites-updater',
      serviceHost: '',
      keysFromResponse: '*',
    }, {
      serviceName: 'parser',
      serviceHost: '',
      keysFromResponse: ['selectors', 'siteUrl'],
    }, {
      serviceName: 'data-poster',
      serviceHost: '',
      keysFromResponse: '*',
    }]);
  });
});
