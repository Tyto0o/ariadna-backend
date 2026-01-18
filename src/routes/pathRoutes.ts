import { Router } from 'express';
import { calculatePath } from '../controllers/pathController';

const router: Router = Router();

/**
 * @swagger
 * /path/calculate:
 *   post:
 *     summary: Calculate path for robot to target avoiding obstacles
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               robotId:
 *                 type: string
 *               target:
 *                 type: object
 *                 properties:
 *                   x:
 *                     type: number
 *                   y:
 *                     type: number
 *     responses:
 *       200:
 *         description: Path calculated successfully
 */
router.post('/path/calculate', calculatePath);

export default router;
