import { Router } from 'express';
import { startSimulationController } from '../controllers/simulationController';

const router: Router = Router();

/**
 * @swagger
 * /simulation:
 *   post:
 *     summary: Start robot simulation for provided path
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - robotId
 *               - path
 *             properties:
 *               robotId:
 *                 type: string
 *                 description: Identifier of robot whose position will be streamed over websocket
 *                 example: "robot-1"
 *               path:
 *                 type: array
 *                 description: Ordered list of points that the robot should follow
 *                 items:
 *                   type: object
 *                   required:
 *                     - x
 *                     - y
 *                   properties:
 *                     x:
 *                       type: number
 *                       description: X coordinate
 *                     y:
 *                       type: number
 *                       description: Y coordinate
 *                 example: [{"x": 0, "y": 0}, {"x": 100, "y": 0}, {"x": 100, "y": 100}]
 *     responses:
 *       202:
 *         description: Simulation started
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "running"
 *                 robotId:
 *                   type: string
 *                   example: "robot-1"
 *                 speedPxPerSec:
 *                   type: number
 *                 example: 50
 *       400:
 *         description: Invalid request payload (e.g. invalid robotId or path)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid robotId or path"
 */

router.post('/simulation', startSimulationController);

export default router;
