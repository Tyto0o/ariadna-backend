import { Schema, model, Document } from 'mongoose';

interface IRobot extends Document {
  name: string;
  position: {
    x: number;
    y: number;
  };
}

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
