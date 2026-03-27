import Obstacle from '../models/Obstacle';
import type { IObstacle } from '../types';
import { invalidateGraphCache } from './graphCache';

let cachedObstacles: IObstacle[] = [];

export const initializeObstacleCache = async (): Promise<void> => {
  try {
    cachedObstacles = await Obstacle.find();
  } catch (error) {
    console.error('Failed to initialize obstacle cache:', error);
    cachedObstacles = [];
  }

  invalidateGraphCache();
};

export const addObstacleToCache = (obstacle: IObstacle): void => {
  cachedObstacles.push(obstacle);
  invalidateGraphCache();
};

export const removeObstacleFromCache = (obstacleId: string): void => {
  cachedObstacles = cachedObstacles.filter(
    (obs) => obs._id?.toString() !== obstacleId
  );
  invalidateGraphCache();
};

export const updateObstacleInCache = (updatedObstacle: IObstacle): void => {
  const index = cachedObstacles.findIndex(
    (obs) => obs._id?.toString() === updatedObstacle._id?.toString()
  );
  if (index !== -1) {
    cachedObstacles[index] = updatedObstacle;
    invalidateGraphCache();
  }
};

export const getCachedObstacles = (): IObstacle[] => {
  return cachedObstacles.slice();
};
