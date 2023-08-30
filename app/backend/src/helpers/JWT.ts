import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';

interface Payload {
  email: string;
}

export default class JWT {
  static generateToken(payload: Payload) {
    return jwt.sign(payload, secret);
  }
}
