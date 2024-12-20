import 'dotenv/config';
import 'reflect-metadata';
import { createServer } from 'http';
import app from './app';
import winston from 'winston';
import { createWebSocketServer } from './modules/websockets/ws.service';

const server = createServer(app);
createWebSocketServer(server);
const { PORT, HOST } = process.env;

server.listen(PORT, () => {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  winston.info(`Server running on ${HOST}:${PORT}`);
  winston.info(`Websocket is running on ws://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  winston.info('Shutting down server gracefully...');
  server.close(() => {
    winston.info('Server shut down.');
    process.exit(0);
  });
});

// Error handling
process.on('uncaughtException', err => {
  console.error('Uncaught exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled rejection:', reason);
  process.exit(1);
});
