import { Request, Response } from 'express';
import Robot from '../models/Robot';
import { findPath } from '../utils/pathfinding';

export const calculatePath = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { robotId, target } = req.body;

    if (
      !robotId ||
      !target ||
      target.x === undefined ||
      target.y === undefined
    ) {
      res.status(400).json({ error: 'robotId and target {x, y} are required' });
      return;
    }

    const robot = await Robot.findById(robotId);
    if (!robot) {
      res.status(404).json({ error: 'Robot not found' });
      return;
    }

    const path = findPath(robot.position, target);
    if (!path) {
      res.status(404).json({ error: 'No path found' });
      return;
    }

    res.json({
      robotId: robot._id,
      start: robot.position,
      target,
      path,
    });
  } catch (error) {
    console.error('Error calculating path:', error);
    res.status(500).json({
      error: 'Failed to calculate path',
      message: error instanceof Error ? error.message : 'Internal server error',
    });
  }
};
