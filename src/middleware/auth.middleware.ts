import { environment } from 'config';
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { tNetwork } from 'types';

export const authenticateToken = (req: tNetwork.AuthReq, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(tNetwork.Status.Unauthenticated).json({ message: 'Unauthenticated' });
    return;
  }

  try {
    const decoded = jwt.verify(token, environment.jwtSecret) as { userId: string };
    req.user = { userId: decoded.userId };
    next();
    return;
  } catch (err) {
    res.status(tNetwork.Status.Unauthorized).json({ message: 'Unauthorized' });
    return;
  }
};