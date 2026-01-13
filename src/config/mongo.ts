import mongoose from 'mongoose';
import { MONGO_URL } from './constants';

export const connectToMongoDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};
