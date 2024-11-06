import { environment } from 'config';
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { tAuth, tNetwork } from 'types';
import {
  initiateLoginSchema,
  loginVerifySchema,
  passwordResetInitiationSchema,
  signupSchema,
  verifyAccountSchema,
} from 'utils/validation';

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

export const validateSignup = (req: tNetwork.AuthReq, res: Response, next: NextFunction) => {
  const { error } = signupSchema.validate(req.body);

  if (error) {
    res.status(tNetwork.Status.BadRequest).json({
      error: true,
      message: 'Invalid request data',
      data: { details: error.details.map((detail: { message: string }) => detail.message) },
    });
    return;
  }

  next();
};

export const validateVerifyAccount = (
  req: tNetwork.AuthReq<tAuth.AccountVerifReq>,
  res: Response,
  next: NextFunction,
) => {
  const { error } = verifyAccountSchema.validate(req.body);

  if (error) {
    res.status(tNetwork.Status.BadRequest).json({
      error: true,
      message: 'Invalid request data',
      data: { details: error.details.map((detail: { message: string }) => detail.message) },
    });
    return;
  }

  next();
};

export const validateLoginInitiation = (
  req: tNetwork.AuthReq<tAuth.LoginReq>,
  res: Response,
  next: NextFunction,
) => {
  const { error } = initiateLoginSchema.validate(req.body);

  if (error) {
    res.status(tNetwork.Status.Unauthenticated).json({
      error: true,
      message: 'Invalid login login cred',
      data: { details: error.details.map((detail: { message: string }) => detail.message) },
    });

    return;
  }

  next();
};

export const validateLoginVerify = (
  req: tNetwork.AuthReq<tAuth.LoginVerifReq>,
  res: Response,
  next: NextFunction,
) => {
  const { error } = loginVerifySchema.validate(req.body);

  if (error) {
    res.status(tNetwork.Status.Unauthenticated).json({
      error: true,
      message: 'Login failed',
      data: { details: error.details.map((detail: { message: string }) => detail.message) },
    });
    return;
  }

  next();
};

export const validatePasswordResetInitiation = (
  req: tNetwork.AuthReq<tAuth.ResetPasswordReq>,
  res: Response,
  next: NextFunction,
) => {
  const { error } = passwordResetInitiationSchema.validate(req.body);

  if (error) {
    res.status(tNetwork.Status.BadRequest).json({
      error: true,
      message: 'Invalid request data',
      data: { details: error.details.map((detail: { message: string }) => detail.message) },
    });
    return;
  }

  next();
};
