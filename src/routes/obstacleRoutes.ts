import { Router } from 'express';
import {
  getObstacles,
  createObstacle,
  deleteObstacle,
  patchObstacle,
  putObstacle,
} from '../controllers/obstacleController';

const router: Router = Router();

/**
 * @swagger
 * /obstacles:
 *   get:
 *     summary: Get all obstacles
 *     responses:
 *       200:
 *         description: List of obstacles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Unique obstacle identifier
 *                   name:
 *                     type: string
 *                     description: Name of the obstacle
 *                   position:
 *                     type: object
 *                     description: Position of the obstacle's center point
 *                     properties:
 *                       x:
 *                         type: number
 *                         description: X coordinate of the obstacle's center
 *                       y:
 *                         type: number
 *                         description: Y coordinate of the obstacle's center
 *                   width:
 *                     type: number
 *                     description: Width of the obstacle along the X axis
 *                   length:
 *                     type: number
 *                     description: Length of the obstacle along the Y axis
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *   post:
 *     summary: Create a new obstacle
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the obstacle
 *               position:
 *                 type: object
 *                 description: Position of the obstacle's center point
 *                 properties:
 *                   x:
 *                     type: number
 *                     description: X coordinate of the obstacle's center
 *                   y:
 *                     type: number
 *                     description: Y coordinate of the obstacle's center
 *               width:
 *                 type: number
 *                 description: Width of the obstacle along the X axis
 *               length:
 *                 type: number
 *                 description: Length of the obstacle along the Y axis
 *     responses:
 *       201:
 *         description: Obstacle created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad request - Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 * /obstacles/{id}:
 *   delete:
 *     summary: Delete an obstacle
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Obstacle ID
 *     responses:
 *       200:
 *         description: Obstacle deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Obstacle not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *   put:
 *     summary: Replace an obstacle (full update)
 *     description: Replaces the entire obstacle resource. All required fields must be provided.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Obstacle ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - position
 *               - width
 *               - length
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the obstacle
 *               position:
 *                 type: object
 *                 required:
 *                   - x
 *                   - y
 *                 description: Position of the obstacle's center point
 *                 properties:
 *                   x:
 *                     type: number
 *                     description: X coordinate of the obstacle's center
 *                   y:
 *                     type: number
 *                     description: Y coordinate of the obstacle's center
 *               width:
 *                 type: number
 *                 description: Width of the obstacle along the X axis
 *               length:
 *                 type: number
 *                 description: Length of the obstacle along the Y axis
 *     responses:
 *       200:
 *         description: Obstacle replaced successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad request - Validation error or missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       404:
 *         description: Obstacle not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *   patch:
 *     summary: Partially update an obstacle
 *     description: Updates only the provided fields. All fields are optional.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Obstacle ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the obstacle
 *               position:
 *                 type: object
 *                 description: Position of the obstacle's center point
 *                 properties:
 *                   x:
 *                     type: number
 *                     description: X coordinate of the obstacle's center
 *                   y:
 *                     type: number
 *                     description: Y coordinate of the obstacle's center
 *               width:
 *                 type: number
 *                 description: Width of the obstacle along the X axis
 *               length:
 *                 type: number
 *                 description: Length of the obstacle along the Y axis
 *     responses:
 *       200:
 *         description: Obstacle updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad request - Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       404:
 *         description: Obstacle not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.route('/obstacles').get(getObstacles).post(createObstacle);
router
  .route('/obstacles/:id')
  .put(putObstacle)
  .patch(patchObstacle)
  .delete(deleteObstacle);

export default router;
