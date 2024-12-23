import { NestMiddleware } from '@nestjs/common';
import { Injectable, verifyToken } from '@shared/utils';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).send('Unauthorized');
    }

    try {
      const payload = verifyToken(token);
      req.body.userInfo = payload;
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ message: 'Token inválido', statusCode: 401, data: null });
    }
  }
}
