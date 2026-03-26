import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../src/models/Robot', () => ({
  default: {
    findByIdAndUpdate: vi.fn(() => ({
      exec: vi.fn().mockResolvedValue(null),
    })),
  },
}));

import {
  setSimulationPublisher,
  startSimulation,
} from '../../src/services/simulationEngine';

type Published = {
  robotId: string;
  x: number;
  y: number;
};

describe('simulationEngine.startSimulation', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    startSimulation([], 'cleanup');
    setSimulationPublisher(() => {});
    vi.useRealTimers();
  });

  it('emits start immediately and target at the end', () => {
    const messages: Published[] = [];
    setSimulationPublisher((message) => messages.push(message));

    startSimulation(
      [
        { x: 0, y: 0 },
        { x: 100, y: 0 },
      ],
      'robot-1'
    );

    expect(messages[0]).toEqual({ robotId: 'robot-1', x: 0, y: 0 });

    vi.advanceTimersByTime(2000);

    expect(messages[messages.length - 1]).toEqual({
      robotId: 'robot-1',
      x: 100,
      y: 0,
    });
  });

  it('does nothing for an empty path', () => {
    const messages: Published[] = [];
    setSimulationPublisher((message) => messages.push(message));

    startSimulation([], 'robot-1');

    vi.advanceTimersByTime(1000);
    expect(messages).toHaveLength(0);
  });

  it('ignores non-finite paths', () => {
    const messages: Published[] = [];
    setSimulationPublisher((message) => messages.push(message));

    startSimulation(
      [
        { x: 0, y: 0 },
        { x: Number.POSITIVE_INFINITY, y: 0 },
      ],
      'robot-1'
    );

    vi.advanceTimersByTime(1000);
    expect(messages).toHaveLength(0);
  });

  it('stops previous run when a new simulation starts', () => {
    const messages: Published[] = [];
    setSimulationPublisher((message) => messages.push(message));

    startSimulation(
      [
        { x: 0, y: 0 },
        { x: 300, y: 0 },
      ],
      'robot-a'
    );

    vi.advanceTimersByTime(500);
    const robotABeforeRestart = messages.filter(
      (message) => message.robotId === 'robot-a'
    ).length;

    startSimulation(
      [
        { x: 10, y: 10 },
        { x: 20, y: 10 },
      ],
      'robot-b'
    );

    vi.advanceTimersByTime(5000);

    const robotAAfterRestart = messages.filter(
      (message) => message.robotId === 'robot-a'
    ).length;
    const robotBLast = messages
      .filter((message) => message.robotId === 'robot-b')
      .at(-1);

    expect(robotAAfterRestart).toBe(robotABeforeRestart);
    expect(robotBLast).toEqual({ robotId: 'robot-b', x: 20, y: 10 });
  });
});
