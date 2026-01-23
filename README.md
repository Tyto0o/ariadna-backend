# Ariadna 3D - Backend Engine 🚀

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)

**Advanced pathfinding and spatial management system for autonomous warehouse robots**

[Features](#-key-features) •
[Quick Start](#-quick-start) •
[API Docs](#-api-documentation) •
[Architecture](#-architecture-overview) •
[Development](#-development)

</div>

---

## 📋 Overview

Ariadna 3D Backend is a high-performance computational engine designed for autonomous warehouse robotics systems. It provides real-time pathfinding, obstacle management, and robot fleet coordination through a RESTful API architecture.

The system implements Dijkstra's algorithm for guaranteed shortest-path routing while maintaining persistent spatial data for dynamic warehouse environments.

## 🧠 Key Features

- **Pathfinding Engine**: Implementation of Dijkstra's Algorithm to guarantee the shortest path between the robot's current position and the destination in a weighted graph environment.
- **Warehouse Manager**: RESTful API for managing warehouse layouts, including static obstacles (shelves, walls).
- **Robot State Controller**: Maintaining and updating the real-time status and telemetry of the robot fleet.
- **Spatial Data Persistence**: Efficient storage of environment configurations using MongoDB.
- **API Documentation**: Interactive Swagger UI for testing endpoints.

## 🛠 Tech Stack

| Category             | Technology                           | Version |
| -------------------- | ------------------------------------ | ------- |
| **Runtime**          | Node.js                              | v20+    |
| **Language**         | TypeScript                           | 5.9.3   |
| **Framework**        | Express.js                           | 4.18.2  |
| **Database**         | MongoDB                              | 7.0     |
| **ODM**              | Mongoose                             | 8.0.3   |
| **Documentation**    | Swagger/OpenAPI                      | -       |
| **Containerization** | Docker & Docker Compose              | -       |
| **Algorithm**        | node-dijkstra                        | 2.5.1   |
| **Dev Tools**        | ts-node-dev, ESLint, Prettier, Husky | -       |

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v20.0.0 or higher ([Download](https://nodejs.org/))
- **Docker** & **Docker Compose** ([Download](https://www.docker.com/))
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd ariadna-backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory:

```env
PORT=8000
MONGO_URL=mongodb://localhost:27017/ariadna
```

### Running the Application

#### Option 1: Development with local MongoDB

1. Start MongoDB:

```bash
docker-compose up -d mongodb
```

2. Run the development server:

```bash
npm run dev
```

#### Option 2: Full Docker Compose

```bash
docker-compose up
```

This will start both MongoDB and the application in containers.

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Run production build
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run lint` - Check code for errors with ESLint
- `npm run lint:fix` - Fix ESLint errors automatically

## 📚 API Documentation

Once the server is running, access the interactive API documentation:

**Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)

### Available Endpoints

#### 🤖 Robot Management

| Method   | Endpoint          | Description        |
| -------- | ----------------- | ------------------ |
| `GET`    | `/api/robots`     | Get all robots     |
| `POST`   | `/api/robots`     | Create a new robot |
| `PUT`    | `/api/robots/:id` | Update robot by ID |
| `DELETE` | `/api/robots/:id` | Delete robot by ID |

#### 🚧 Obstacle Management

| Method   | Endpoint             | Description           |
| -------- | -------------------- | --------------------- |
| `GET`    | `/api/obstacles`     | Get all obstacles     |
| `POST`   | `/api/obstacles`     | Create a new obstacle |
| `PUT`    | `/api/obstacles/:id` | Update obstacle by ID |
| `DELETE` | `/api/obstacles/:id` | Delete obstacle by ID |

#### 🗺️ Pathfinding

| Method | Endpoint    | Description                        |
| ------ | ----------- | ---------------------------------- |
| `POST` | `/api/path` | Calculate optimal path for a robot |

## 📁 Project Structure

```
ariadna-backend/
├── src/
│   ├── config/                 # Configuration files
│   │   ├── constants.ts        # Application constants and workspace bounds
│   │   ├── mongo.ts            # MongoDB connection setup
│   │   ├── swagger.ts          # Swagger/OpenAPI configuration
│   │   └── middleware.ts       # Express middleware setup (CORS, JSON parsing)
│   ├── controllers/            # Request handlers
│   │   ├── robotController.ts      # Robot CRUD operations
│   │   ├── pathController.ts       # Pathfinding logic
│   │   └── obstacleController.ts   # Obstacle management
│   ├── models/                 # MongoDB schemas
│   │   ├── Robot.ts            # Robot model (name, position, status)
│   │   └── Obstacle.ts         # Obstacle model (position, size, type)
│   ├── routes/                 # API route definitions
│   │   ├── routes.ts           # Main router (aggregates all routes)
│   │   ├── robotRoutes.ts      # Robot endpoints with Swagger docs
│   │   ├── pathRoutes.ts       # Pathfinding endpoints
│   │   └── obstacleRoutes.ts   # Obstacle endpoints
│   ├── utils/                  # Utility functions
│   │   └── pathfinding.ts      # Dijkstra's algorithm implementation
│   ├── app.ts                  # Express app setup (middleware, routes, Swagger)
│   └── server.ts               # Server initialization and DB connection
├── .husky/                     # Git hooks
│   └── pre-commit              # Pre-commit quality checks
├── .env.example                # Environment variables template
├── eslint.config.js            # ESLint configuration
├── .prettierrc                 # Prettier configuration
├── .gitignore                  # Git ignore patterns
├── docker-compose.yml          # Docker services configuration
├── Dockerfile                  # Application container definition
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Project documentation
```

## Architecture Overview

The project follows a **modular, layered architecture** with clear separation of concerns:

## Available Scripts

| Script           | Command                | Description                                           |
| ---------------- | ---------------------- | ----------------------------------------------------- |
| **Development**  | `npm run dev`          | Start dev server with hot-reload (ts-node-dev)        |
| **Build**        | `npm run build`        | Compile TypeScript to JavaScript                      |
| **Production**   | `npm start`            | Run production build (requires `npm run build` first) |
| **Linting**      | `npm run lint`         | Check code for errors with ESLint                     |
| **Lint Fix**     | `npm run lint:fix`     | Auto-fix ESLint errors                                |
| **Format**       | `npm run format`       | Format code with Prettier                             |
| **Format Check** | `npm run format:check` | Check code formatting without changes                 |
| **Prepare**      | `npm run prepare`      | Setup Husky git hooks (runs automatically)            |

## 🐳 Docker Management

### Docker Compose Commands

```bash
# Start all services
docker-compose up

# Start in detached mode (background)
docker-compose up -d

# Start only MongoDB
docker-compose up -d mongodb

# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# View logs (all services)
docker-compose logs -f


# Rebuild containers
docker-compose up --build
```

## 📝 Environment Variables

| Variable    | Description               | Default                             |
| ----------- | ------------------------- | ----------------------------------- |
| `PORT`      | Server port               | `8000`                              |
| `MONGO_URL` | MongoDB connection string | `mongodb://localhost:27017/ariadna` |

## 🧑‍💻 Development

The development server uses `ts-node-dev` for hot reloading. Any changes to `.ts` files will automatically restart the server.

### Code Quality

This project uses ESLint + Prettier for code quality and formatting.

**ESLint** - Code linting and error detection:

```bash
# Check for errors
npm run lint

# Fix errors automatically
npm run lint:fix
```

**Prettier** - Code formatting:

```bash
# Format all files
npm run format

# Check formatting
npm run format:check
```

**Pre-commit Hooks** - Automatic code quality checks:

- Husky automatically runs before each commit
- lint-staged checks only modified files
- ESLint fixes errors → Prettier formats code
- Commit is blocked if there are unfixable errors

Configuration files:

- `.eslintrc.json` - ESLint rules
- `.prettierrc` - Prettier configuration
- `.husky/pre-commit` - Pre-commit hook

## 🛡️ Troubleshooting

### MongoDB connection errors

Ensure MongoDB is running:

```bash
docker-compose ps
```

If MongoDB is not running:

```bash
docker-compose up -d mongodb
```

### Port already in use

Change the `PORT` variable in your `.env` file to a different port.

### TypeScript compilation errors

Ensure all dependencies are installed:

```bash
npm install
```
