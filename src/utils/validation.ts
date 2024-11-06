import Joi from 'joi';
import { tAuth, tUsers } from 'types';

export const signupSchema = Joi.object<tAuth.SignupReq>({
  mobile: Joi.string()
    .pattern(/^\+?[0-9]{10,15}$/)
    .required()
    .messages({
      'string.pattern.base':
        'Mobile number must contain only numbers, optionally start with +, and be 10-15 digits long.',
    }),
  name: Joi.string().min(2).max(100),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(255).required(),
});

export const verifyAccountSchema = Joi.object<tAuth.AccountVerifReq>({
  mobile: Joi.string()
    .pattern(/^\+?[0-9]{10,15}$/)
    .required(),
  code: Joi.string().required(),
});

export const initiateLoginSchema = Joi.object<tAuth.LoginReq>({
  mobile: Joi.string().required(),
  password: Joi.string().required(),
});

export const loginVerifySchema = Joi.object<tAuth.LoginVerifReq>({
  mobile: Joi.string().required(),
  code: Joi.string().required(),
});

export const passwordResetInitiationSchema = Joi.object<tAuth.ResetPasswordReq>({
  mobile: Joi.string().required(),
});

export const passwordResetVerifySchema = Joi.object<tAuth.RestPasswordVerifReq>({
  mobile: Joi.string().required(),
  password: Joi.string().min(8).max(255).required(),
  code: Joi.string().required(),
});
export const updateUserSchema = Joi.object<tUsers.UpdateMeReq>({
  name: Joi.string().min(2).max(100).optional(),
  email: Joi.string().email().optional(),
})
  .or('name', 'email')
  .messages({
    'object.missing': 'At least one of name or email must be provided for update.',
  });
