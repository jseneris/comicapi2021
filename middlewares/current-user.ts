import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const keys = require('../config/keys.js');

interface UserPayload {
  id: string;
  email: string;
  sub: string;
  nickname: string;
  name: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('middleware');
  if (!req.headers.authorization) {
    return next();
  }

  try {
    console.log('token', req.headers.authorization);
    console.log('key', keys.jwtKey);
    const payload = jwt.verify(
      req.headers.authorization.replace('Bearer ', ''),
      keys.jwtKey
    ) as UserPayload;
    console.log('payload', payload);
    req.currentUser = payload;
  } catch (err) {
    console.log('error', err);
  }

  next();
};
