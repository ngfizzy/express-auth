import Joi from 'joi';
import { tAuth } from 'types';

export const validateSignup = (data: tAuth.SignupReq) => {
  const schema = Joi.object({
    mobile: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .required()
      .message('phone number not valid'),
    password: Joi.string().min(8).required().message('password must be at least 8 characters'),
  });

  return schema.validate(data);
};
