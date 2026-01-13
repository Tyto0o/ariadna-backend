import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec, swaggerURL } from './config/swagger';
import { API_PREFIX, DOCUMENTATION_ENDPOINT } from './config/constants';
import { setupMiddleware } from './config/middleware';
import routes from './routes/routes';

const app: express.Application = express();

// Setup middleware
setupMiddleware(app);

// Swagger documentation
app.use(DOCUMENTATION_ENDPOINT, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Swagger docs URL
console.log(`Swagger docs available at ${swaggerURL}`);

// Register routes with API prefix
app.use(API_PREFIX, routes);

export default app;
