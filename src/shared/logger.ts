import { existsSync, mkdirSync } from 'fs';
import winston, { configure, transports, format } from 'winston';
import { appConfig } from '../config/index';

// Logger setup function
const Logger = (): void => {
  // Set default NODE_ENV to 'development' if not defined
  if (!appConfig.NODE_ENV) appConfig.NODE_ENV = 'development';

  const loggerTransports: winston.transport[] = []; // Array to store logger transports

  // Ensure the 'logs' directory exists
  if (!existsSync('logs')) {
    mkdirSync('logs', {
      recursive: true,
    });
  }

  // Define logger transports based on NODE_ENV
  if (appConfig.NODE_ENV === 'development') {
    loggerTransports.push(
      new transports.File({
        level: 'info',
        filename: 'logs/development.log',
      }),
      new transports.File({
        level: 'error',
        filename: 'logs/development-error.log',
      })
    );
  }

  if (appConfig.NODE_ENV === 'production') {
    loggerTransports.push(
      new transports.File({
        level: 'info',
        filename: 'logs/production.log',
      }),
      new transports.File({
        level: 'error',
        filename: 'logs/production-error.log',
      })
    );
  }

  if (appConfig.NODE_ENV === 'test') {
    loggerTransports.push(
      new transports.File({
        level: 'info',
        filename: 'logs/test.log',
      }),
      new transports.File({
        level: 'error',
        filename: 'logs/test-error.log',
      })
    );
  }

  if (appConfig.NODE_ENV === 'staging') {
    loggerTransports.push(
      new transports.File({
        level: 'info',
        filename: 'logs/staging.log',
      }),
      new transports.File({
        level: 'error',
        filename: 'logs/staging-error.log',
      })
    );
  }

  // Configure Winston logger with specified transports
  configure({
    level: 'info',
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss A' }),
      format.errors({ stack: true }),
      format.splat(),
      format.json()
    ),
    defaultMeta: { service: `${appConfig.APP_NAME}` },
    transports: loggerTransports,
    exitOnError: false,
  });

  // Add console transport for development environment
  if (appConfig.NODE_ENV === 'development') {
    winston.add(
      new transports.Console({
        format: format.combine(format.colorize(), format.simple()),
      })
    );
  }
};

export default Logger;
