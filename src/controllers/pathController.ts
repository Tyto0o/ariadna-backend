import { Request, Response } from 'express';
import Robot, { IRobot } from '../models/Robot';
import { findPath } from '../utils/pathfinding';

export const calculatePath = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      robotId,
      target,
    }: { robotId: string; target: { x: number; y: number } } = req.body;

    if (
      !robotId ||
      !target ||
      target.x === undefined ||
      target.y === undefined
    ) {
      res.status(400).json({ error: 'robotId and target {x, y} are required' });
      return;
    }

    const robot: IRobot | null = await Robot.findById(robotId);
    if (!robot) {
      res.status(404).json({ error: 'Robot not found' });
      return;
    }

    const path: { x: number; y: number }[] | null = findPath(
      robot.position,
      target
    );
    if (!path) {
      res.status(422).json({
        error:
          'Unable to find a valid path from the robot’s current position to the requested target.',
        details:
          'The target may be unreachable due to obstacles or because it is outside the configured workspace bounds.',
        robotId: robot._id,
        start: robot.position,
        target,
      });
      return;
    }

    res.json({
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
