import { Request, Response } from 'express';

import UserService from '../services/LoginService';

class LoginController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await UserService.login(email, password);
    res.status(user.status).json(user.data);
  }
}

export default LoginController;
