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

// Demo obstacles - przeszkody na magazynie
export const OBSTACLES: Obstacle[] = [
  { x: 300, y: 0, width: 300, height: 100 },
  { x: 150, y: 100, width: 300, height: 500 },
  { x: 80, y: 150, width: 40, height: 40 },
  { x: 200, y: 50, width: 20, height: 80 },
];

const GRID_STEP = 10; // Rozdzielczość siatki - co 5 jednostek
const ERROR_MARGIN = 20; // Bufor bezpieczeństwa wokół robota - margines od przeszkód

const isCollision = (x: number, y: number): boolean => {
  return OBSTACLES.some((obs) => {
    // Sprawdź kolizję z buforem bezpieczeństwa
    return (
      x >= obs.x - ERROR_MARGIN &&
      x <= obs.x + obs.width + ERROR_MARGIN &&
      y >= obs.y - ERROR_MARGIN &&
      y <= obs.y + obs.height + ERROR_MARGIN
    );
  });
};

const snapToGrid = (value: number): number => {
  return Math.round(value / GRID_STEP) * GRID_STEP;
};

const buildGraph = (maxX: number, maxY: number): Graph => {
  const graph = new Graph();
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

      const nodeId = `${x},${y}`;
      const neighbors: Record<string, number> = {};

      for (const dir of directions) {
        const nx = x + dir.x;
        const ny = y + dir.y;

        if (
          nx >= 0 &&
          nx <= maxX &&
          ny >= 0 &&
          ny <= maxY &&
          !isCollision(nx, ny)
        ) {
          const cost = dir.x !== 0 && dir.y !== 0 ? 1.414 : 1; // Przekątne droższe
          neighbors[`${nx},${ny}`] = cost;
        }
      }

      graph.addNode(nodeId, neighbors);
    }
  }

  return graph;
};

// Sprawdza czy punkt mid leży na linii prostej między p1 i p2
const isPointOnLine = (p1: Point, mid: Point, p2: Point): boolean => {
  const dx1 = mid.x - p1.x;
  const dy1 = mid.y - p1.y;
  const dx2 = p2.x - p1.x;
  const dy2 = p2.y - p1.y;

  // Sprawdź czy wektory są współliniowe (iloczyn wektorowy = 0)
  const cross = dx1 * dy2 - dy1 * dx2;
  return Math.abs(cross) < 0.01;
};

// Upraszcza ścieżkę usuwając zbędne punkty pośrednie
const simplifyPath = (path: Point[]): Point[] => {
  if (path.length <= 2) return path;

  const simplified: Point[] = [path[0]];

  for (let i = 1; i < path.length - 1; i++) {
    const prev = simplified[simplified.length - 1];
    const current = path[i];
    const next = path[i + 1];

    // Jeśli punkt nie leży na linii prostej, dodaj go
    if (!isPointOnLine(prev, current, next)) {
      simplified.push(current);
    }
  }

  // Zawsze dodaj punkt końcowy
  simplified.push(path[path.length - 1]);

  return simplified;
};

export const findPath = (start: Point, target: Point): Point[] | null => {
  const snappedStart = { x: snapToGrid(start.x), y: snapToGrid(start.y) };
  const snappedTarget = { x: snapToGrid(target.x), y: snapToGrid(target.y) };

  // Rozszerz obszar grafu aby uwzględnić wszystkie możliwe ścieżki
  const maxX =
    Math.max(
      snappedStart.x,
      snappedTarget.x,
      ...OBSTACLES.map((o) => o.x + o.width)
    ) + 100;
  const maxY =
    Math.max(
      snappedStart.y,
      snappedTarget.y,
      ...OBSTACLES.map((o) => o.y + o.height)
    ) + 100;

  const graph = buildGraph(maxX, maxY);
  const startId = `${snappedStart.x},${snappedStart.y}`;
  const targetId = `${snappedTarget.x},${snappedTarget.y}`;

  const path = graph.path(startId, targetId, { cost: false });

  if (!path) return null;

  const fullPath = (path as string[]).map((nodeId) => {
    const [x, y] = nodeId.split(',').map(Number);
    return { x, y };
  });

  // Uprość ścieżkę usuwając zbędne punkty pośrednie
  return simplifyPath(fullPath);
};
