import { Router } from 'express';
import { UsersController } from '../../controllers/';
import { UsersService } from '../../services';
import { UserRepo } from '../../repositories';
import * as middleware from '../../middleware';

export const router = Router();
const userService = new UsersService(new UserRepo());
const usersController = new UsersController(userService);

router.get('/me', (req, res) => usersController.me(req, res));
router.patch('/me', middleware.user.validateUpdateMe, (req, res) =>
  usersController.updateMe(req, res),
);
