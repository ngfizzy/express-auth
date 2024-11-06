import { Response } from 'express';
import { tNetwork, tUsers } from '../types';
import { UsersService } from '../services';
import { netw } from '../utils';

export class UsersController {
  private usersService: UsersService;

  constructor(usersService: UsersService) {
    this.usersService = usersService;
  }

  async me(req: tNetwork.AuthReq, res: Response): Promise<void> {
    const result = await this.usersService.getUserById(req?.user?.userId!);
    if (result.data) {
      const { password, ...me } = result.data;
      result.data = me as typeof result.data;
      return netw.sendResponse(res, result);
    }

    return netw.sendResponse(res, result);
  }

  async updateMe(req: tNetwork.AuthReq<tUsers.UpdateMeReq>, res: Response): Promise<void> {
    const { name, email } = req.body;
    const result = await this.usersService.updateProfile(req?.user?.userId!, { name, email });
    return netw.sendResponse(res, result);
  }
}
