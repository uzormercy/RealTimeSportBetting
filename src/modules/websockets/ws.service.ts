import { WebSocket, WebSocketServer } from 'ws';
import { Server } from 'http';

interface WebSocketMessage {
  type: string;
  payload: any;
}

const handleWebSocketMessage = (message: WebSocketMessage, sender: WebSocket, clients: Set<WebSocket>) => {
  switch (message.type) {
    case 'broadcast':
      // Broadcast to all clients except sender
      clients.forEach(client => {
        if (client !== sender && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(message));
        }
      });
      break;
    case 'echo':
      // Echo back to sender
      sender.send(JSON.stringify(message));
      break;
    default:
      console.log('Received message:', message);
  }
};

export const createWebSocketServer = (server: Server) => {
  const wss = new WebSocketServer({ server });

  const clients = new Set<WebSocket>();

  wss.on('connection', (ws: WebSocket) => {
    clients.add(ws);
    console.log('New WebSocket connection established');

    ws.on('message', (message: string) => {
      try {
        const parsedMessage: WebSocketMessage = JSON.parse(message.toString());
        handleWebSocketMessage(parsedMessage, ws, clients);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    });

    ws.on('close', () => {
      clients.delete(ws);
      console.log('Client disconnected');
    });
    // Send initial connection confirmation
    ws.send(JSON.stringify({ type: 'connection', payload: 'Connected to WebSocket server' }));
  });

  return wss;
};
