import express from 'express';
import { AuthController } from '../../controllers';
import { AuthService, UserRequestsVerificationService } from '../../services';
import { AppRequestRepo, UserRepo, UserRequestRepo } from '../../repositories';
import { DevSmsService, SMSService, TwilioSender } from '../../services/sms.service';
import { environment } from '../../config';
import * as middleware from '../../middleware';
import { tAuth, tNetwork } from '../../types';

export const router = express.Router();

const smsSender =
  environment.nodeEnv === 'development' || 'test' ? new DevSmsService() : new TwilioSender();
const smsSrv = new SMSService(smsSender);
const userVerificationSrv = new UserRequestsVerificationService(
  new AppRequestRepo(),
  new UserRequestRepo(),
  new UserRepo(),
  smsSrv,
);
const authSrv = new AuthService(new UserRepo(), userVerificationSrv);
const authController = new AuthController(authSrv);
router.post(
  '/signup',
  middleware.auth.validateSignup,
  (req: tNetwork.AuthReq<tAuth.SignupReq>, res) => authController.signup(req, res),
);
router.post('/signup/verify', middleware.auth.validateVerifyAccount, (req, res) =>
  authController.verifyAccount(req, res),
);
router.post('/login', middleware.auth.validateLoginInitiation, (req, res) =>
  authController.initiateLogin(req, res),
);
router.post('/login/verify', middleware.auth.validateLoginVerify, (req, res) =>
  authController.login(req, res),
);
router.post('/passwords/reset', middleware.auth.validatePasswordResetInitiation, (req, res) =>
  authController.initiatePasswordReset(req, res),
);
router.post('/passwords/reset/verify', middleware.auth.validatePasswordReset, (req, res) =>
  authController.resetPassword(req, res),
);
