import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CONFIG } from '../../settings/app.settings';
import { Request } from 'express';
import { TokensBlackListRepository } from '../../features/auth/infrastructure/tokens-black-list.repository';

@Injectable()
export class AuthBearerGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private tokensBLRepository: TokensBlackListRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token)
      throw new UnauthorizedException('accessToken is invalid or expired');

    try {
      const isTokenInBlackList = await this.tokensBLRepository.isTokenInBL(
        token,
      );
      if (isTokenInBlackList) {
        throw new UnauthorizedException('accessToken is invalid or expired');
      }

      const payload = await this.jwtService.verifyAsync(token, {
        secret: CONFIG.JWT_SECRET,
      });

      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('accessToken is invalid or expired');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
