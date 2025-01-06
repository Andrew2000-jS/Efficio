import { NestMiddleware } from '@nestjs/common';
import { Injectable, verifyToken } from '@shared/utils';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    let token = req.header('Authorization');

    if (!token || !token.startsWith('Bearer ')) {
      return res.status(401).send('Unauthorized');
    }

    token = token.replace('Bearer ', '');

    try {
      const payload = verifyToken(token);
      req.body.userInfo = payload;
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ message: 'Invalid token', statusCode: 401, data: null });
    }
  }
}
