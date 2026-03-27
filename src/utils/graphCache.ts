import Graph from 'node-dijkstra';

interface GraphCache {
  graph: Graph | null;
  maxX: number;
  maxY: number;
  obstaclesHash: string;
}

const graphCache: GraphCache = {
  graph: null,
  maxX: 0,
  maxY: 0,
  obstaclesHash: '',
};

export const invalidateGraphCache = (): void => {
  graphCache.graph = null;
  graphCache.maxX = 0;
  graphCache.maxY = 0;
  graphCache.obstaclesHash = '';
};

export const getGraphCache = (): GraphCache => {
  return { ...graphCache };
};

export const setGraphCache = (
  graph: Graph,
  maxX: number,
  maxY: number,
  obstaclesHash: string
): void => {
  graphCache.graph = graph;
  graphCache.maxX = maxX;
  graphCache.maxY = maxY;
  graphCache.obstaclesHash = obstaclesHash;
};
