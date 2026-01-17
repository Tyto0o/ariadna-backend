import { Router } from 'express';
import robotRoutes from './robotRoutes';

const router: Router = Router();

// All routes
router.use(robotRoutes);

export default router;
