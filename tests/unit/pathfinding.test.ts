import { describe, expect, it, vi } from 'vitest';

const loadPathfinding = async () => {
  vi.resetModules();
  vi.doMock('../../src/models/Obstacle', () => ({
    default: {
      find: vi.fn().mockResolvedValue([]),
    },
  }));

  return import('../../src/utils/pathfinding');
};

describe('pathfinding.findPath', () => {
  it('returns a valid path for reachable points', async () => {
    const pathfinding = await loadPathfinding();

    const path = await pathfinding.findPath({ x: 0, y: 0 }, { x: 100, y: 100 });

    expect(path).not.toBeNull();
    expect(path?.[0]).toEqual({ x: 0, y: 0 });
    expect(path?.[path.length - 1]).toEqual({ x: 100, y: 100 });
  });

  it('returns null when the target area is fully blocked', async () => {
    const pathfinding = await loadPathfinding();

    pathfinding.addObstacleToCache({
      name: 'wall',
      position: { x: 50, y: 50 },
      width: 2000,
      length: 2000,
    } as never);

    const path = await pathfinding.findPath({ x: 0, y: 0 }, { x: 100, y: 100 });

    expect(path).toBeNull();
  });

  it('changes route when an obstacle is added to cache', async () => {
    const pathfinding = await loadPathfinding();

    const baseline = await pathfinding.findPath(
      { x: 0, y: 0 },
      { x: 100, y: 0 }
    );
    expect(baseline).not.toBeNull();

    pathfinding.addObstacleToCache({
      name: 'middle-obstacle',
      position: { x: 50, y: 0 },
      width: 20,
      length: 20,
    } as never);

    const rerouted = await pathfinding.findPath(
      { x: 0, y: 0 },
      { x: 100, y: 0 }
    );

    expect(rerouted).not.toBeNull();
    expect(rerouted).not.toEqual(baseline);
  });
});
