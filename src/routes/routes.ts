import { Router } from 'express';
import robotRoutes from './robotRoutes';
import pathRoutes from './pathRoutes';

const router: Router = Router();

// All routes
router.use(robotRoutes);
router.use(pathRoutes);

export default router;
