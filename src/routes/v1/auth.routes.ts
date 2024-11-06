import express from 'express';
import { AuthController } from '../../controllers';
import { AuthService, UserRequestsVerificationService } from 'services';
import { AppRequestRepo, UserRepo, UserRequestRepo } from 'repositories';
import { DevSmsService, SMSService, TwilioSender } from 'services/sms.service';
import { environment } from 'config';
import * as middleware from 'middleware';
import { tAuth, tNetwork } from 'types';

export const router = express.Router();

const smsSender = environment.nodeEnv === 'development' ? new DevSmsService() : new TwilioSender();
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
router.post('/signup/verify', (req, res) => authController.verifyAccount(req, res));
router.post('/login', (req, res) => authController.requestLogin(req, res));
router.post('/login/verify', (req, res) => authController.login(req, res));
router.post('/password/reset/request', (req, res) => authController.requestPasswordReset(req, res));
router.post('/password/reset', (req, res) => authController.resetPassword(req, res));
