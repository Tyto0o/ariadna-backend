import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { findByIdMock, findPathMock } = vi.hoisted(() => ({
  findByIdMock: vi.fn(),
  findPathMock: vi.fn(),
}));

vi.mock('../../src/models/Robot', () => ({
  default: {
    findById: findByIdMock,
  },
}));

vi.mock('../../src/utils/pathfinding', () => ({
  findPath: findPathMock,
  addObstacleToCache: vi.fn(),
  removeObstacleFromCache: vi.fn(),
  updateObstacleInCache: vi.fn(),
}));

import app from '../../src/app';

describe('POST /api/path', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 400 when robotId or target is missing', async () => {
    const response = await request(app).post('/api/path').send({});

    expect(response.status).toBe(400);
    expect(response.body.error).toContain('robotId and target');
  });

  it('returns 404 when robot does not exist', async () => {
    findByIdMock.mockResolvedValueOnce(null);

    const response = await request(app)
      .post('/api/path')
      .send({
        robotId: 'robot-1',
        target: { x: 10, y: 20 },
      });

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Robot not found');
  });

  it('returns 422 when path cannot be found', async () => {
    findByIdMock.mockResolvedValueOnce({
      _id: 'robot-1',
      position: { x: 0, y: 0 },
    });
    findPathMock.mockResolvedValueOnce(null);

    const response = await request(app)
      .post('/api/path')
      .send({
        robotId: 'robot-1',
        target: { x: 10, y: 20 },
      });

    expect(response.status).toBe(422);
    expect(response.body.error).toContain('Unable to find a valid path');
  });

  it('returns 200 with computed path', async () => {
    findByIdMock.mockResolvedValueOnce({
      _id: 'robot-1',
      position: { x: 0, y: 0 },
    });
    findPathMock.mockResolvedValueOnce([
      { x: 0, y: 0 },
      { x: 10, y: 10 },
    ]);

    const response = await request(app)
      .post('/api/path')
      .send({
        robotId: 'robot-1',
        target: { x: 10, y: 10 },
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      path: [
        { x: 0, y: 0 },
        { x: 10, y: 10 },
      ],
    });
  });
});
