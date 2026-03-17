export type Point = {
  x: number;
  y: number;
};

type SimulationPositionMessage = {
  robotId: string;
  x: number;
  y: number;
};

type Publisher = (position: SimulationPositionMessage) => void;

let publish: Publisher = () => {};
let activeTimer: ReturnType<typeof setInterval> | null = null;

export const SPEED_PX_PER_SEC = 50;
const TICK_MS = 100;

const distance = (a: Point, b: Point): number => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
};

const interpolate = (a: Point, b: Point, t: number): Point => ({
  x: a.x + (b.x - a.x) * t,
  y: a.y + (b.y - a.y) * t,
});

export const setSimulationPublisher = (publisher: Publisher): void => {
  publish = publisher;
};

const emitPosition = (robotId: string, point: Point): void => {
  publish({
    robotId,
    x: point.x,
    y: point.y,
  });
};

export const startSimulation = (path: Point[], robotId: string): void => {
  if (activeTimer) {
    clearInterval(activeTimer);
    activeTimer = null;
  }

  if (!path || path.length === 0) {
    return;
  }

  const segments = path.slice(0, -1).map((from, index) => {
    const to = path[index + 1];
    return {
      from,
      to,
      length: distance(from, to),
    };
  });

  const totalLength = segments.reduce(
    (sum, segment) => sum + segment.length,
    0
  );

  const hasNonFiniteSegment = segments.some(
    (segment) => !Number.isFinite(segment.length)
  );
  if (!Number.isFinite(totalLength) || hasNonFiniteSegment) {
    if (activeTimer) {
      clearInterval(activeTimer);
      activeTimer = null;
    }
    return;
  }

  emitPosition(robotId, path[0]);

  if (totalLength === 0) {
    return;
  }

  let traveled = 0;

  activeTimer = setInterval(() => {
    traveled += (SPEED_PX_PER_SEC * TICK_MS) / 1000;

    if (traveled >= totalLength) {
      emitPosition(robotId, path[path.length - 1]);
      if (activeTimer) {
        clearInterval(activeTimer);
        activeTimer = null;
      }
      return;
    }

    let offset = 0;

    for (const segment of segments) {
      if (traveled <= offset + segment.length) {
        const local =
          segment.length === 0 ? 1 : (traveled - offset) / segment.length;
        emitPosition(robotId, interpolate(segment.from, segment.to, local));
        return;
      }
      offset += segment.length;
    }
  }, TICK_MS);
};
