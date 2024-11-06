import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepo } from '../repositories';
import { tAuth, tSrvs, tVerif } from 'types';
import { UserRequestsVerificationService } from './user-request-verification.service';
import logger from 'utils/logger';
import { srvcs } from 'utils';
import { environment } from 'config';

export class AuthService {
  private userRepo: UserRepo;
  private verificationService: UserRequestsVerificationService;

  constructor(userRepo: UserRepo, verificationService: UserRequestsVerificationService) {
    this.userRepo = userRepo;
    this.verificationService = verificationService;
  }

  async signup(credentials: tAuth.SignupReq): Promise<tSrvs.Result> {
    const existingUsr = await this.userRepo.getUserByMobile(credentials.mobile);
    if (existingUsr) {
      return srvcs.results.createConflictResult('User already exists');
    }

    const pswdHashRes = await this.hashPassword(credentials.password);

    if (pswdHashRes.error) {
      pswdHashRes.message = 'signup failed';
    }

    const user = await this.userRepo.createUser({ ...credentials, password: pswdHashRes.data! });
    if (!user) {
      return srvcs.results.createUnexpectedErrorResult('signup failed');
    }

    let message = 'signup successful ';

    const getMessage = (verificationSent: boolean) => {
      return `${message};${verificationSent ? 'we have sent you a verification code' : 'failed to send verification code but you can still sign in and request for verification later'}`;
    };
    try {
      const verifRes = await this.verificationService.createUserAccountVerificationRequest(user.id);
      message = getMessage(!verifRes?.error);
    } catch (error) {
      logger.warn('failed to send verification code', error);
      message = getMessage(false);
    }

    return srvcs.results.createCreatedResult(message);
  }

  async requestLogin(credentials: tAuth.LoginReq): Promise<tSrvs.Result> {
    const user = await this.userRepo.getUserByMobile(credentials.mobile);
    if (!user) {
      return srvcs.results.createUnauthenticatedResult('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
    if (!isPasswordValid) {
      return srvcs.results.createUnauthenticatedResult('Invalid credentials');
    }

    const verRes = await this.verificationService.createLoginVerificationRequest(user.id);

    if (verRes.error) {
      return srvcs.results.createUnexpectedErrorResult(
        'failed to send verification code, try again later',
      );
    }

    return srvcs.results.createOkResult(
      'we have sent you a 2FA code for verifying this login attempt',
    );
  }

  async login(credential: tAuth.LoginVerifReq) {
    const user = await this.userRepo.getUserByMobile(credential.mobile);
    if (!user) {
      return srvcs.results.createConflictResult('User not found');
    }

    const verifRes = await this.verificationService.validateLoginVerificationCode(
      user,
      credential.code,
    );

    if (verifRes.error) {
      return srvcs.results.createUnauthenticatedResult('Invalid credentials');
    }
    const tokenRes = this.generateJWTToken(user.id);
    if (tokenRes.error) {
      return srvcs.results.createUnauthenticatedResult('Invalid credentials');
    }

    return srvcs.results.createOkResult('Login successful', { token: tokenRes.data });
  }

  async verifyAccount(credentials: tAuth.AccountVerifReq): Promise<tSrvs.Result> {
    const user = await this.userRepo.getUserByMobile(credentials.mobile);
    if (!user) {
      return srvcs.results.createConflictResult('User not found');
    }

    const validationRes = await this.verificationService.validateAccountVerificationCode(
      user,
      credentials.code,
    );
    if (validationRes.error) {
      return validationRes;
    }

    await this.userRepo.markUserAsVerified(user.id);

    return srvcs.results.createOkResult('Account verified successfully');
  }

  async requestPasswordReset(mobile: string): Promise<tSrvs.Result> {
    const user = await this.userRepo.getUserByMobile(mobile);
    if (!user) {
      return srvcs.results.createInvalidDataErrorResult('Failed to update password');
    }

    const resetReqRes = await this.verificationService.createPasswordResetRequest(user);
    if (resetReqRes.error) {
      return srvcs.results.createUnexpectedErrorResult(
        'Failed to send reset code, try again later',
      );
    }

    return srvcs.results.createOkResult('Password reset code sent successfully');
  }

  async resetPassword(data: tAuth.RestPasswordVerifReq): Promise<tSrvs.Result> {
    const user = await this.userRepo.getUserByMobile(data.mobile);
    if (!user) {
      return srvcs.results.createConflictResult('User not found');
    }

    const verifRes = await this.verificationService.validatePasswordResetCode(user, data.code);
    if (verifRes.error) {
      return srvcs.results.createUnauthenticatedResult('Invalid or expired reset code');
    }

    const hashRes = await this.hashPassword(data.password);
    if (hashRes.error) {
      return srvcs.results.createUnexpectedErrorResult('Failed to update password');
    }

    const updateRes = await this.userRepo.updateUser(user.id, { password: hashRes.data! });
    if (!updateRes) {
      return srvcs.results.createUnexpectedErrorResult('Failed to update password');
    }

    return srvcs.results.createOkResult('Password has been reset successfully');
  }
  private generateJWTToken(userId: string) {
    try {
      const token = jwt.sign({ userId }, environment.jwtSecret, {
        expiresIn: environment.jwtExp,
      });
      return srvcs.results.createOkResult('token generate successfully', token);
    } catch (error) {
      return srvcs.results.createUnexpectedErrorResult('failed to generate token');
    }
  }

  private async hashPassword(password: string) {
    try {
      const hashedPassword = await bcrypt.hash(password, environment.saltRound);

      return srvcs.results.createOkResult('hashed password successfully', hashedPassword);
    } catch (error) {
      return srvcs.results.createUnexpectedErrorResult('failed while hashing password');
    }
  }
}
