import app from './app';
import { connectToMongoDB } from './config/mongo';
import { PORT } from './config/constants';
import { createServer } from 'http';
import { setupWebSocket } from './websocket/websocket';

// Connect to MongoDB
connectToMongoDB();

const server = createServer(app);
setupWebSocket(server);

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`WebSocket available at ws://localhost:${PORT}/ws`);
});
