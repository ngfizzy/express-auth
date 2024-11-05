import { Request, UserRequest } from 'models';
import { AppDataSource } from '../config';
import { User } from '../models/user';
import { MoreThan } from 'typeorm';

export class UserRequestRepo {
  private usrReqRepo = AppDataSource.getRepository(UserRequest);

  createRequest(code: string, exp: Date, rel: { user: User; request: Request }) {
    const usrReq = this.usrReqRepo.create({
      ...rel,
      code,
      expiresAt: exp,
    });

    return this.usrReqRepo.save(usrReq);
  }

  markAsComplete(id: string) {
    return this.usrReqRepo.update({ id }, { completed: true });
  }

  getUnexpiredRequestByUserIdAndName(userid: string, name: string) {
    return this.usrReqRepo.findOne({
      where: {
        user: { id: userid },
        request: { name },
        completed: false,
        expiresAt: MoreThan(new Date()),
      },
    });
  }

  getActiveVerificationRequest(userId: string, code: string, name: string) {
    return this.usrReqRepo.findOne({
      where: {
        user: { id: userId },
        request: { name },
        code,
        completed: false,
        expiresAt: MoreThan(new Date()),
      },
    });
  }
}
