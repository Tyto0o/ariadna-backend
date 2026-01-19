import { Request, Response } from 'express';
import Obstacle from '../models/Obstacle';
import {
  addObstacleToCache,
  removeObstacleFromCache,
  updateObstacleInCache,
} from '../utils/pathfinding';

export const getObstacles = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const obstacles = await Obstacle.find();
    res.json(obstacles);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to fetch obstacles';
    res.status(500).json({ error: message });
  }
};

export const createObstacle = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const obstacle = new Obstacle(req.body);
    await obstacle.save();
    addObstacleToCache(obstacle);
    res.status(201).json(obstacle);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to create obstacle';
    res.status(400).json({ error: message });
  }
};

export const deleteObstacle = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const obstacle = await Obstacle.findByIdAndDelete(id);
    if (!obstacle) {
      res.status(404).json({ error: 'Obstacle not found' });
      return;
    }
    removeObstacleFromCache(id);
    res.json({ message: 'Obstacle deleted successfully' });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to delete obstacle';
    res.status(500).json({ error: message });
  }
};

export const updateObstacle = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const obstacle = await Obstacle.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!obstacle) {
      res.status(404).json({ error: 'Obstacle not found' });
      return;
    }
    updateObstacleInCache(obstacle);
    res.json(obstacle);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to update obstacle';
    res.status(400).json({ error: message });
  }
};
