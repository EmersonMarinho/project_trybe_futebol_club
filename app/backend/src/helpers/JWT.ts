import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';

interface Payload {
  email: string;
}

export default class JWT {
  static generateToken(payload: Payload) {
    return jwt.sign(payload, secret);
  }

  static verifyToken(token: string) {
    return jwt.verify(token, secret);
  }
}
