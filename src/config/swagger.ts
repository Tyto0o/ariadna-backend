import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';
import { PORT, API_PREFIX, DOCUMENTATION_ENDPOINT } from './constants';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Ariadna API',
      version: '1.0.0',
      description: 'Ariadna Backend API Documentation',
    },
    servers: [
      {
        url: `http://localhost:${PORT}${API_PREFIX}`,
        description: 'Development server',
      },
    ],
  },
  apis: [
    path.join(__dirname, '../routes/*.ts'),
    path.join(__dirname, '../routes/*.js'),
  ],
};

export const swaggerSpec = swaggerJsdoc(options);
export const swaggerURL: string = `http://localhost:${PORT}${DOCUMENTATION_ENDPOINT}`;
