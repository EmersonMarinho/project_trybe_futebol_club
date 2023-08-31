import { Request, Response } from 'express';

import LoginService from '../services/LoginService';

class LoginController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await LoginService.login(email, password);
    res.status(user.status).json(user.data);
  }

  static async getRole(req: Request, res: Response) {
    const { email } = req.body.user;
    const user = await LoginService.getRole(email);
    res.status(200).json(user);
  }
}

export default LoginController;
