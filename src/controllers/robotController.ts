import { Request, Response } from 'express';
import Robot, { IRobot } from '../models/Robot';

export const getRobots = async (req: Request, res: Response): Promise<void> => {
  try {
    const robots: IRobot[] = await Robot.find();
    res.json(robots);
  } catch (error) {
    const message: string =
      error instanceof Error ? error.message : 'Failed to fetch robots';
    res.status(500).json({ error: message });
  }
};

export const createRobot = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const robot: IRobot = new Robot(req.body);
    await robot.save();
    res.status(201).json(robot);
  } catch (error) {
    const message: string =
      error instanceof Error ? error.message : 'Failed to create robot';
    res.status(400).json({ error: message });
  }
};

export const deleteRobot = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const robot: IRobot | null = await Robot.findByIdAndDelete(id);
    if (!robot) {
      res.status(404).json({ error: 'Robot not found' });
      return;
    }
    res.json({ message: 'Robot deleted successfully' });
  } catch (error) {
    const message: string =
      error instanceof Error ? error.message : 'Failed to delete robot';
    res.status(500).json({ error: message });
  }
};

export const updateRobot = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id: string = req.params.id;
    const robot: IRobot | null = await Robot.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!robot) {
      res.status(404).json({ error: 'Robot not found' });
      return;
    }
    res.json(robot);
  } catch (error) {
    const message: string =
      error instanceof Error ? error.message : 'Failed to update robot';
    res.status(400).json({ error: message });
  }
};
