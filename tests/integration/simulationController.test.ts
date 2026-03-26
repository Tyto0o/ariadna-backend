import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { startSimulationMock } = vi.hoisted(() => ({
  startSimulationMock: vi.fn(),
}));

vi.mock('../../src/services/simulationEngine', () => ({
  startSimulation: startSimulationMock,
  SPEED_PX_PER_SEC: 50,
}));

import app from '../../src/app';

describe('POST /api/simulation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 400 for invalid robotId', async () => {
    const response = await request(app)
      .post('/api/simulation')
      .send({
        robotId: '   ',
        path: [
          { x: 0, y: 0 },
          { x: 10, y: 10 },
        ],
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toContain('robotId is required');
  });

  it('returns 400 for invalid path payload', async () => {
    const response = await request(app)
      .post('/api/simulation')
      .send({
        robotId: 'robot-1',
        path: [{ x: 0, y: 0 }],
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toContain(
      'path must be an array of at least 2 points'
    );
  });

  it('returns 202 and starts simulation for valid payload', async () => {
    const payload = {
      robotId: 'robot-1',
      path: [
        { x: 0, y: 0 },
        { x: 100, y: 0 },
      ],
    };

    const response = await request(app).post('/api/simulation').send(payload);

    expect(response.status).toBe(202);
    expect(response.body).toEqual({
      status: 'running',
      robotId: 'robot-1',
      speedPxPerSec: 50,
    });
    expect(startSimulationMock).toHaveBeenCalledTimes(1);
    expect(startSimulationMock).toHaveBeenCalledWith(
      payload.path,
      payload.robotId
    );
  });
});
