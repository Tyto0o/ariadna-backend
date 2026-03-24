import { Request, Response } from 'express';
import {
  startSimulation,
  SPEED_PX_PER_SEC,
} from '../services/simulationEngine';
import type { Point } from '../types';

const MAX_COORDINATE_MAGNITUDE: number = 1000000;

const isValidPoint = (point: unknown): point is Point => {
  if (!point || typeof point !== 'object') return false;
  const candidate = point as { x?: unknown; y?: unknown };

  if (typeof candidate.x !== 'number' || typeof candidate.y !== 'number') {
    return false;
  }

  if (!Number.isFinite(candidate.x) || !Number.isFinite(candidate.y)) {
    return false;
  }

  if (
    Math.abs(candidate.x) > MAX_COORDINATE_MAGNITUDE ||
    Math.abs(candidate.y) > MAX_COORDINATE_MAGNITUDE
  ) {
    return false;
  }

  return true;
};

export const startSimulationController = (
  req: Request,
  res: Response
): void => {
  const { robotId, path }: { robotId: string; path: Point[] } = req.body;

  if (typeof robotId !== 'string' || !robotId.trim()) {
    res.status(400).json({ error: 'robotId is required' });
    return;
  }

  if (!Array.isArray(path) || path.length < 2 || !path.every(isValidPoint)) {
    res.status(400).json({
      error: 'path must be an array of at least 2 points: [{x, y}, ...]',
    });
    return;
  }

  startSimulation(path, robotId);

  res.status(202).json({
    status: 'running',
    robotId,
    speedPxPerSec: SPEED_PX_PER_SEC,
  });
};
