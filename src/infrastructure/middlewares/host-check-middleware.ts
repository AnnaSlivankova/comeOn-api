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
      'localhost:3000',
    ];
    const host = req.headers.host;

    if (!allowedHosts.includes(host)) {
      throw new BadRequestException('Недопустимый хост');
    }

    next();
  }
}
