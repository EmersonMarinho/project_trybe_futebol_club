import { Router } from 'express';

import LoginController from '../controller/LoginController';
import { loginVerify, verifyEmail, verifyPassword } from '../middlewares/loginVerify.middleware';

const router = Router();

router.post('/', loginVerify, verifyEmail, verifyPassword, (req, res) =>
  LoginController.login(req, res));

export default router;
