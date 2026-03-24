import { Schema, model } from 'mongoose';

import type { IRobot } from '../types';

const robotSchema = new Schema<IRobot>(
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
  },
  { timestamps: true }
);

export default model<IRobot>('Robot', robotSchema);
