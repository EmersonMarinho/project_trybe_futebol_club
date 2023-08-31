import { Request, Response, NextFunction } from 'express';
import JWT from '../helpers/JWT';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    console.log(token);
    const bearer = token.replace('Bearer ', '');
    console.log(bearer);
    const decoded = JWT.verifyToken(bearer);
    req.body.user = decoded;
    console.log(decoded);
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default verifyToken;
