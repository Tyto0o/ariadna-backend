# Ariadna 3D - Backend Engine 🚀

The Ariadna 3D Backend is the core computational hub of the system. It is responsible for spatial data management, business logic, and calculating optimal paths for autonomous robots.

## 🧠 Key Features

- **Pathfinding Engine**: Implementation of Dijkstra's Algorithm to guarantee the shortest path between the robot's current position and the destination in a weighted graph environment.
- **Warehouse Manager**: RESTful API for managing warehouse layouts, including static obstacles (shelves, walls).
- **Robot State Controller**: Maintaining and updating the real-time status and telemetry of the robot fleet.
- **Spatial Data Persistence**: Efficient storage of environment configurations using MongoDB.
- **API Documentation**: Interactive Swagger UI for testing endpoints.

## 🛠 Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB
- **Containerization**: Docker & Docker Compose
- **Documentation**: Swagger/OpenAPI
- **Algorithms**: Dijkstra's shortest path algorithm with adjacency list representation of the warehouse grid.

## 🚀 Quick Start

### Prerequisites

- Node.js (v20 or higher)
- Docker & Docker Compose
- npm or yarn

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
PORT='8000'
MONGO_URL='mongodb://localhost:27017/ariadna'
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

- `GET /api/health` - Health check endpoint

## 📁 Project Structure

```
ariadna-backend/
├── src/
│   ├── config/
│   │   ├── constants.ts    # Application constants
│   │   ├── mongo.ts        # MongoDB connection setup
│   │   ├── swagger.ts      # Swagger/OpenAPI configuration
│   │   └── middleware.ts   # Express middleware setup
│   ├── routes/
│   │   ├── routes.ts       # Main router (aggregates all routes)
│   │   └── healthRoutes.ts # Health check routes
│   ├── app.ts              # Express instance with middleware and routes
│   └── server.ts           # Server startup and database connection
├── .husky/
│   └── pre-commit          # Pre-commit hook
├── .env                    # Environment variables (create this)
├── eslint.config.js        # ESLint configuration
├── .eslintignore           # ESLint ignore patterns
├── .prettierrc             # Prettier configuration
├── .prettierignore         # Prettier ignore patterns
├── .gitignore
├── docker-compose.yml      # Docker services configuration
├── Dockerfile              # Application container
├── package.json
├── tsconfig.json           # TypeScript configuration
└── README.md
```

### Architecture Overview

The project follows a modular architecture with clear separation of concerns:

- **config/** - Configuration files for database, API documentation, middleware, and environment variables
- **routes/** - Route handlers organized by feature/domain
- **app.ts** - Express application setup (middleware, routes, Swagger)
- **server.ts** - Server initialization and database connection

This structure makes the codebase:

- ✅ Easy to navigate and understand
- ✅ Simple to add new features
- ✅ Highly maintainable and testable
- ✅ Scalable for larger applications

````

## 🐳 Docker Commands

```bash
# Start all services
docker-compose up -d

# Start only MongoDB
docker-compose up -d mongodb

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# View MongoDB logs
docker-compose logs -f mongodb

# Rebuild containers
docker-compose up --build
````

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
