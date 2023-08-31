import { Router } from 'express';

import LoginController from '../controller/LoginController';
import { loginVerify, verifyEmail, verifyPassword } from '../middlewares/loginVerify.middleware';
import verifyToken from '../middlewares/verifyToken.middleware';

const router = Router();

router.post('/', loginVerify, verifyEmail, verifyPassword, (req, res) =>
  LoginController.login(req, res));

router.get('/role', verifyToken, (req, res) => {
  LoginController.getRole(req, res);
});

export default router;
