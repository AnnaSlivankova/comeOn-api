import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class HostCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const allowedHosts = [
      'hanna-lib.ru',
      'www.hanna-lib.ru',
      'https://hanna-lib.ru',
      'http://localhost:3000/',
      'http://localhost:3001/',
      'localhost:3000',
      'http://5.253.188.2:10048/',
      'http://5.253.188.2:10062/',
      'http://5.253.188.2:10063/',
      '5.253.188.2:10063',
      '5.253.188.2:10062',
      '5.253.188.2:10048',
      'https://come-on-psi.vercel.app/',
      'come-on-psi.vercel.app',
      'https://api.hanna-lib.ru',
      'http://localhost:5173/',
    ];
    const host = req.headers.host;

    if (!allowedHosts.includes(host)) {
      throw new BadRequestException('Недопустимый хост');
    }

    next();
  }
}
