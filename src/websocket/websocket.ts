import { Server } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { setSimulationPublisher } from '../services/simulationEngine';

export const setupWebSocket = (server: Server): void => {
  const wss = new WebSocketServer({ server, path: '/ws' });

  const broadcast = (payload: unknown): void => {
    const message = JSON.stringify(payload);

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  };

  setSimulationPublisher((event) => {
    broadcast(event);
  });

  wss.on('connection', (socket) => {
    socket.send(
      JSON.stringify({
        type: 'connected',
        message: 'ws connected',
      })
    );
  });
};
