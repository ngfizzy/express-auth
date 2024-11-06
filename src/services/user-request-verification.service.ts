import { AppRequestRepo, UserRepo, UserRequestRepo } from '../repositories';
import { minsIntoFuture } from 'utils/date-time';
import { environment } from 'config';
import { Request, User, UserRequest } from 'models';
import { tSrvs, tVerif } from 'types';
import { SMSService } from './sms.service';
import { rand, srvcs } from 'utils';

export class UserRequestsVerificationService {
  private appReqRep: AppRequestRepo;
  private usrReqRepo: UserRequestRepo;
  private usrRepo: UserRepo;
  private smsService: SMSService;

  constructor(
    appReqRepo: AppRequestRepo,
    usrRequestRepo: UserRequestRepo,
    usrRepo: UserRepo,
    smsService: SMSService,
  ) {
    this.appReqRep = appReqRepo;
    this.usrReqRepo = usrRequestRepo;
    this.usrRepo = usrRepo;
    this.smsService = smsService;
  }

  async createVerificationRequest(
    userId: string,
    requestType: tVerif.AppRequestVals,
    successMessage: string,
  ): Promise<tSrvs.Result<UserRequest | unknown>> {
    const existingRequest = await this.usrReqRepo.getUnexpiredRequestByUserIdAndName(
      userId,
      requestType,
    );

    if (existingRequest) {
      return srvcs.results.createConflictResult(
        'A request has already been sent. Please try again later.',
      );
    }

    const requestRecord = await this.createVerificationRecord(userId, requestType);
    if (requestRecord.error) {
      return requestRecord;
    }
    const { code, expiresAt, user } = requestRecord.data!;
    const smsResult = await this.sendVerificationCode(code, user.mobile!, expiresAt);
    if (smsResult.error) {
      return smsResult;
    }

    return srvcs.results.createCreatedResult(successMessage, requestRecord.data);
  }

  async validateVerificationCode(
    user: User,
    code: string,
    requestType: tVerif.AppRequestVals,
    successMessage: string,
  ): Promise<tSrvs.Result> {
    const activeRequest = await this.usrReqRepo.getActiveVerificationRequest(
      user.id,
      code,
      requestType,
    );
    if (!activeRequest) {
      return srvcs.results.createInvalidDataErrorResult('Verification code is invalid or expired.');
    }

    await this.usrReqRepo.markAsComplete(activeRequest.id);
    return srvcs.results.createOkResult(successMessage, { requestId: activeRequest.id });
  }

  async createPasswordResetRequest(user: User): Promise<tSrvs.Result<UserRequest | unknown>> {
    return this.createVerificationRequest(
      user.id,
      tVerif.AppRequests.PasswordReset,
      'Password reset request created successfully',
    );
  }

  async validatePasswordResetCode(user: User, code: string): Promise<tSrvs.Result> {
    return this.validateVerificationCode(
      user,
      code,
      tVerif.AppRequests.PasswordReset,
      'Password reset code validated successfully',
    );
  }

  async createUserAccountVerificationRequest(
    userId: string,
  ): Promise<tSrvs.Result<UserRequest | unknown>> {
    return this.createVerificationRequest(
      userId,
      tVerif.AppRequests.AccountVerification,
      'User verification request created successfully',
    );
  }

  async validateAccountVerificationCode(user: User, code: string): Promise<tSrvs.Result> {
    return this.validateVerificationCode(
      user,
      code,
      tVerif.AppRequests.AccountVerification,
      'Account verification completed successfully',
    );
  }

  async createLoginVerificationRequest(
    userId: string,
  ): Promise<tSrvs.Result<UserRequest | unknown>> {
    return this.createVerificationRequest(
      userId,
      tVerif.AppRequests.LoginVerification,
      'Login verification request created successfully',
    );
  }

  async validateLoginVerificationCode(user: User, code: string): Promise<tSrvs.Result> {
    return this.validateVerificationCode(
      user,
      code,
      tVerif.AppRequests.LoginVerification,
      'Login verification completed successfully',
    );
  }

  private async sendVerificationCode(
    code: string,
    to: string,
    expiresAt: Date,
  ): Promise<tSrvs.Result> {
    const message = `Your verification code is ${code}. It will expire on ${expiresAt.toLocaleTimeString()}.`;
    return this.smsService.send(message, to);
  }

  private async createVerificationRecord(
    userId: string,
    requestType: tVerif.AppRequestVals,
  ): Promise<tSrvs.Result<UserRequest>> {
    const relationsResult = await this.getRelations(userId, requestType);
    if (relationsResult.error) {
      const { data, ...rest } = relationsResult;
      return rest;
    }

    const exp = minsIntoFuture(environment.verificationCodeExpInMin);
    const verificationRequest = await this.usrReqRepo.createRequest(
      rand.getNumericStr(8),
      exp,
      relationsResult.data!,
    );

    if (!verificationRequest) {
      return srvcs.results.createUnexpectedErrorResult(`Failed to create ${requestType} request`);
    }

    return srvcs.results.createCreatedResult(
      `${requestType} request created successfully`,
      verificationRequest,
    );
  }

  private async getRelations(
    userId: string,
    requestType: tVerif.AppRequestVals,
  ): Promise<tSrvs.Result<{ request: Request; user: User }>> {
    const user = await this.usrRepo.getUserById(userId);
    if (!user) {
      return srvcs.results.createInsufficientDataErrorResult('User does not exist');
    }

    const request = await this.appReqRep.fetchOrCreate(requestType);
    if (!request) {
      return srvcs.results.createUnexpectedErrorResult('Request type not found');
    }

    return srvcs.results.createOkResult('Relations fetched successfully', { request, user });
  }
}
