import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const PORT: string = `${process.env.PORT}`;
export const MONGO_URL: string = `${process.env.MONGO_URL}`;
export const NODE_ENV: string = `${process.env.NODE_ENV}`;
export const API_PREFIX: string = '/api';
export const DOCUMENTATION_ENDPOINT: string = '/docs';
