import pick from 'lodash/pick';
import omit from 'lodash/omit';
import flatten from 'lodash/flatten';

import type {
  ServicesGraph,
  ServicesGraphNode,
} from './types';

export const pickDistributedDataFromNode = <T>(data: T, service: ServicesGraphNode): Partial<T> => {
  if (service.keysFromResponse) {
    if (service.keysFromResponse === '*') {
      return data;
    }

    return pick(data, service.keysFromResponse);
  }

  return data;
};

const graphAsRootNodeOnly = (servicesGraph: ServicesGraph): ServicesGraphNode => {
  return omit(servicesGraph, 'nodes');
};

// Так как нет разницы и придется юзать flatten можно немного и хуйней с типами данных позаниматься
export const traverseGraphInDepth = (servicesGraph: ServicesGraph): ServicesGraphNode[] => {
  if (!servicesGraph.nodes) {
    return [servicesGraph];
  }

  const resNodesArray = [
    graphAsRootNodeOnly(servicesGraph),
    ...flatten(servicesGraph.nodes.map(traverseGraphInDepth))
  ];

  return resNodesArray;
};
