import { AppDataSource } from '../config';
import { User } from '../models';

export class UserRepo {
  updateUser(id: string, updates: Partial<User>) {
    return this.userRepo.update(
      {
        id,
      },
      updates,
    );
  }
  private userRepo = AppDataSource.getRepository(User);

  getUserById(id: string) {
    return this.userRepo.findOne({ where: { id } });
  }

  getUserByMobile(mobile: string) {
    return this.userRepo.findOne({ where: { mobile } });
  }

  createUser(newUser: { mobile: string; email: string; password: string; name: string }) {
    const user = this.userRepo.create(newUser);
    return this.userRepo.save(user);
  }

  markUserAsVerified(id: string) {
    return this.userRepo.update(
      {
        id,
      },
      { isVerified: true },
    );
  }
}
