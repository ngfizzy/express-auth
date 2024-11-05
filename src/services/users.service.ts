import { User } from 'models';
import { UserRepo } from '../repositories';
import { tSrvs } from 'types';
import { srvcs } from 'utils';

export class UsersService {
  private userRepo: UserRepo;

  constructor(userRepo: UserRepo) {
    this.userRepo = userRepo;
  }

  async getUserById(userId: string): Promise<tSrvs.Result<User>> {
    const user = await this.userRepo.getUserById(userId);

    if (!user) {
      return srvcs.results.createNotFoundErrorResult('user not found');
    }

    return srvcs.results.createOkResult('found', user);
  }

  async updateProfile(
    userId: string,
    updates: Partial<Pick<User, 'name' | 'email'>>,
  ): Promise<tSrvs.Result<Omit<User, 'password'>>> {
    const user = await this.userRepo.getUserById(userId);
    if (!user) {
      return srvcs.results.createNotFoundErrorResult('user not found');
    }

    try {
      await this.userRepo.updateUser(userId, updates);
      const { password, ...rest } = user;
      const update = { ...rest, ...updates };
      return srvcs.results.createOkResult('Profile updated successfully', update);
    } catch (error) {
      return srvcs.results.createUnexpectedErrorResult('Failed to update profile');
    }
  }
}
