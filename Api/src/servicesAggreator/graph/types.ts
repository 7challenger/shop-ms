export type ServicesGraphNode = {
  serviceName: string,
  serviceHost: string,

  shouldBeAggregated?: boolean,
  keysFromResponse?: string | string[],
};

export interface ServicesGraph extends ServicesGraphNode {
  nodes?: ServicesGraph[];
}

export type ServicesGraphGetter = () => ServicesGraph;