import { JwtService } from '@nestjs/jwt';

const jwt = new JwtService();

export const verifyToken = (token: string): any => {
  try {
    const decoded = jwt.verify(token, { secret: process.env.TOKEN_SECRET });
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
};
