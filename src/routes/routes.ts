import { Router } from 'express';
import healthRoutes from './healthRoutes';

const router: Router = Router();

// Register all routes
router.use(healthRoutes);

export default router;
