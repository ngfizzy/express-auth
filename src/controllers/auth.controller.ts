import { Response } from 'express';

import { AuthService } from 'services';
import { tAuth, tNetwork } from 'types';
import { netw } from 'utils';

export class AuthController {
  private authSrv: AuthService;
  constructor(authSrv: AuthService) {
    this.authSrv = authSrv;
  }

  async signup(req: tNetwork.Req<tAuth.SignupReq>, res: Response): Promise<void> {
    return netw.sendResponse(res, await this.authSrv.signup(req.body));
  }

  async verifyAccount(req: tNetwork.Req<tAuth.AccountVerifReq>, res: Response): Promise<void> {
    return netw.sendResponse(res, await this.authSrv.verifyAccount(req.body));
  }

  async requestLogin(req: tNetwork.Req<tAuth.LoginReq>, res: Response): Promise<void> {
    return netw.sendResponse(res, await this.authSrv.requestLogin(req.body));
  }

  async login(req: tNetwork.Req<tAuth.LoginVerifReq>, res: Response): Promise<void> {
    return netw.sendResponse(res, await this.authSrv.login(req.body));
  }

  async requestPasswordReset(req: tNetwork.Req<tAuth.ResetPasswordReq>, res: Response) {
    return netw.sendResponse(res, await this.authSrv.requestPasswordReset(req.body.mobile));
  }

  async resetPassword(req: tNetwork.Req<tAuth.RestPasswordVerifReq>, res: Response) {
    return netw.sendResponse(res, await this.authSrv.resetPassword(req.body));
  }
}
