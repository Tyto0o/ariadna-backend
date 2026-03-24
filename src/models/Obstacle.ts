import { Schema, model } from 'mongoose';

import type { IObstacle } from '../types';

const obstacleSchema = new Schema<IObstacle>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    position: {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
    },
    width: {
      type: Number,
      required: true,
    },
    length: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<IObstacle>('Obstacle', obstacleSchema);
