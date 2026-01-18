import Graph from 'node-dijkstra';

interface Point {
  x: number;
  y: number;
}

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
}

// Demo obstacles; later - these would be dynamically set
export const OBSTACLES: Obstacle[] = [];

const GRID_STEP: number = 10; // The distance between nodes in the grid
const OBSTACLE_SAFETY_BUFFER: number = 20; // Safety buffer around obstacles
const WORKSPACE_MARGIN: number = 500; // Extra space around the furthest points to build the graph
const COLLINEARITY_THRESHOLD: number = 0.01; // Threshold for determining collinearity

let cachedGraph: Graph | null = null;
let cachedMaxX: number = 0;
let cachedMaxY: number = 0;
let cachedObstaclesHash: string = '';

const isCollision = (x: number, y: number): boolean => {
  return OBSTACLES.some((obs) => {
    return (
      x >= obs.x - OBSTACLE_SAFETY_BUFFER &&
      x <= obs.x + obs.width + OBSTACLE_SAFETY_BUFFER &&
      y >= obs.y - OBSTACLE_SAFETY_BUFFER &&
      y <= obs.y + obs.height + OBSTACLE_SAFETY_BUFFER
    );
  });
};

const snapToGrid = (value: number): number => {
  return Math.round(value / GRID_STEP) * GRID_STEP;
};

const buildGraph = (maxX: number, maxY: number): Graph => {
  const graph: Graph = new Graph();
  const directions = [
    { x: 0, y: GRID_STEP },
    { x: GRID_STEP, y: 0 },
    { x: 0, y: -GRID_STEP },
    { x: -GRID_STEP, y: 0 },
    { x: GRID_STEP, y: GRID_STEP },
    { x: GRID_STEP, y: -GRID_STEP },
    { x: -GRID_STEP, y: GRID_STEP },
    { x: -GRID_STEP, y: -GRID_STEP },
  ];

  for (let x = 0; x <= maxX; x += GRID_STEP) {
    for (let y = 0; y <= maxY; y += GRID_STEP) {
      if (isCollision(x, y)) continue;

      const nodeId: string = `${x},${y}`;
      const neighbors: Record<string, number> = {};

      for (const dir of directions) {
        const nx: number = x + dir.x;
        const ny: number = y + dir.y;

        if (
          nx >= 0 &&
          nx <= maxX &&
          ny >= 0 &&
          ny <= maxY &&
          !isCollision(nx, ny)
        ) {
          const cost: number = dir.x !== 0 && dir.y !== 0 ? Math.SQRT2 : 1;
          neighbors[`${nx},${ny}`] = cost;
        }
      }

      graph.addNode(nodeId, neighbors);
    }
  }

  return graph;
};

const isPointOnLine = (p1: Point, mid: Point, p2: Point): boolean => {
  const dx1: number = mid.x - p1.x;
  const dy1: number = mid.y - p1.y;
  const dx2: number = p2.x - p1.x;
  const dy2: number = p2.y - p1.y;

  const cross = dx1 * dy2 - dy1 * dx2;
  return Math.abs(cross) < COLLINEARITY_THRESHOLD;
};

const simplifyPath = (path: Point[]): Point[] => {
  if (path.length <= 2) return path;

  const simplified: Point[] = [path[0]];

  for (let i = 1; i < path.length - 1; i++) {
    const prev: Point = simplified[simplified.length - 1];
    const current: Point = path[i];
    const next: Point = path[i + 1];

    if (!isPointOnLine(prev, current, next)) {
      simplified.push(current);
    }
  }

  simplified.push(path[path.length - 1]);

  return simplified;
};

export const findPath = (start: Point, target: Point): Point[] | null => {
  const snappedStart: Point = {
    x: snapToGrid(start.x),
    y: snapToGrid(start.y),
  };
  const snappedTarget: Point = {
    x: snapToGrid(target.x),
    y: snapToGrid(target.y),
  };

  const maxX: number =
    Math.max(
      snappedStart.x,
      snappedTarget.x,
      ...OBSTACLES.map((o) => o.x + o.width)
    ) + WORKSPACE_MARGIN;
  const maxY: number =
    Math.max(
      snappedStart.y,
      snappedTarget.y,
      ...OBSTACLES.map((o) => o.y + o.height)
    ) + WORKSPACE_MARGIN;

  // Check if we can reuse cached graph
  const obstaclesHash: string = JSON.stringify(OBSTACLES);
  let graph: Graph;

  if (
    cachedGraph &&
    cachedMaxX === maxX &&
    cachedMaxY === maxY &&
    cachedObstaclesHash === obstaclesHash
  ) {
    graph = cachedGraph;
  } else {
    graph = buildGraph(maxX, maxY);
    cachedGraph = graph;
    cachedMaxX = maxX;
    cachedMaxY = maxY;
    cachedObstaclesHash = obstaclesHash;
  }

  const startId: string = `${snappedStart.x},${snappedStart.y}`;
  const targetId: string = `${snappedTarget.x},${snappedTarget.y}`;

  const path = graph.path(startId, targetId, { cost: false });

  if (!path) return null;

  const fullPath: Point[] = (path as string[]).map((nodeId) => {
    const [x, y] = nodeId.split(',').map(Number);
    return { x, y };
  });

  return simplifyPath(fullPath);
};
