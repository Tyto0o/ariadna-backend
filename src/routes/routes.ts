import { Router } from 'express';
import robotRoutes from './robotRoutes';
import pathRoutes from './pathRoutes';
import obstacleRoutes from './obstacleRoutes';

const router: Router = Router();

// All routes
router.use(robotRoutes);
router.use(pathRoutes);
router.use(obstacleRoutes);

export default router;
