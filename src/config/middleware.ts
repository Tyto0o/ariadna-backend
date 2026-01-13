import express from 'express';

export const setupMiddleware = (app: express.Application): void => {
  // Parse JSON bodies
  app.use(express.json());
};
