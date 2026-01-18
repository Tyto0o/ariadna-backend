import { Router } from 'express';
import { calculatePath } from '../controllers/pathController';

const router: Router = Router();

/**
 * @swagger
 * /path:
 *   post:
 *     summary: Calculate path for robot to target avoiding obstacles
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - robotId
 *               - target
 *             properties:
 *               robotId:
 *                 type: string
 *                 description: MongoDB ObjectId of the robot
 *                 example: "507f1f77bcf86cd799439011"
 *               target:
 *                 type: object
 *                 required:
 *                   - x
 *                   - y
 *                 properties:
 *                   x:
 *                     type: number
 *                     description: Target X coordinate
 *                     example: 10
 *                   y:
 *                     type: number
 *                     description: Target Y coordinate
 *                     example: 15
 *     responses:
 *       200:
 *         description: Path calculated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 path:
 *                   type: array
 *                   description: Array of coordinates representing the optimal path from start to target
 *                   items:
 *                     type: object
 *                     properties:
 *                       x:
 *                         type: number
 *                       y:
 *                         type: number
 *                   example: [{"x": 5, "y": 5}, {"x": 6, "y": 6}, {"x": 7, "y": 7}]
 *       400:
 *         description: Bad request - missing or invalid parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "robotId and target {x, y} are required"
 *       404:
 *         description: Robot not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Robot not found"
 *       422:
 *         description: Unprocessable Entity - Unable to find valid path
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unable to find a valid path from the robot's current position to the requested target."
 *                 details:
 *                   type: string
 *                   example: "The target may be unreachable due to obstacles or because it is outside the configured workspace bounds."
 *                 robotId:
 *                   type: string
 *                   example: "507f1f77bcf86cd799439011"
 *                 start:
 *                   type: object
 *                   properties:
 *                     x:
 *                       type: number
 *                     y:
 *                       type: number
 *                   description: Starting position of the robot
 *                 target:
 *                   type: object
 *                   properties:
 *                     x:
 *                       type: number
 *                     y:
 *                       type: number
 *                   description: Target position
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to calculate path"
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.post('/path', calculatePath);

export default router;
