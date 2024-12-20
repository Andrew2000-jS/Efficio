import { JwtService } from '@nestjs/jwt';

const jwt = new JwtService();

export const verifyToken = (token: string): boolean => {
  try {
    const decoded = jwt.verify(token, { secret: process.env.TOKEN_SECRET });
    console.log(`Decoded token ${decoded}`);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
