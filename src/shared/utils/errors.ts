import { NextFunction, Request, RequestHandler, Response } from 'express';
import winston from 'winston';
import { IRequestWithUser } from './interface';
import { JsonWebTokenError } from 'jsonwebtoken';

export const appError = (error: any) => {
  winston.error(`Internal Server Error:`, {
    error: error,
  });

  if (error instanceof JsonWebTokenError) {
    winston.error(`JWT Error: ${error}`);
    return { status: 400, title: 'Application error', message: 'Invalid Token' };
  }

  return { status: 500, title: 'Application error', message: 'Internal Server error From App' };
};

export const use = (fn: RequestHandler) => {
  return (req: Request | IRequestWithUser, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);
};

export const requestErrorHandler = (error: any, request: Request, response: Response, next: NextFunction) => {
  const applicationError = appError(error);
  response.status(error.status || 500).json({
    status: error.status || 500,
    title: 'Server error',
    message: applicationError.message,
  });
};
