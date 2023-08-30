import * as bcrypt from 'bcryptjs';
import UserModel from '../database/models/users';
import JWT from '../helpers/JWT';

export default class UserService {
  static async login(email: string, password: string) {
    const user = await UserModel.findOne({ where: { email } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return { status: 401, data: { message: 'Invalid email or password' } };
    }

    const token = JWT.generateToken({ email });
    return { status: 200, data: { token } };
  }
}
