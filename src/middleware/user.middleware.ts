import { Response, NextFunction } from 'express';
import { updateUserSchema } from '../utils/validation';
import { tNetwork, tUsers } from '../types';

export const validateUpdateMe = (
  req: tNetwork.AuthReq<tUsers.UpdateMeReq>,
  res: Response,
  next: NextFunction,
) => {
  const { error } = updateUserSchema.validate(req.body);

  if (error) {
    res.status(tNetwork.Status.BadRequest).json({
      error: true,
      message: 'Invalid request data',
      data: { details: error.details.map(detail => detail.message) },
    });
    return;
  }

  next();
};
