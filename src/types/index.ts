import type { Document } from 'mongoose';

export type Point = {
  x: number;
  y: number;
};

export type SimulationPositionMessage = {
  robotId: string;
  x: number;
  y: number;
};

export type Publisher = (position: SimulationPositionMessage) => void;

export interface IRobot extends Document {
  name: string;
  position: Point;
}

export interface IObstacle extends Document {
  name: string;
  position: Point;
  width: number;
  length: number;
}
