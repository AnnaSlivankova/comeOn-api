import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CONFIG } from '../../settings/app.settings';
import { TokensBlackListRepository } from '../../features/auth/infrastructure/tokens-black-list.repository';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private tokensBLRepository: TokensBlackListRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromCookie(request);

    if (!token)
      throw new UnauthorizedException('refreshToken is invalid or expired');

    try {
      const isTokenInBlackList = await this.tokensBLRepository.isTokenInBL(
        token,
      );

      if (isTokenInBlackList) {
        throw new UnauthorizedException(
          'refreshToken is invalid or expired',
        );
      }

      const payload = await this.jwtService.verifyAsync(token, {
        secret: CONFIG.JWT_SECRET,
      });

      request['userId'] = payload.userId;
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException('refreshToken is invalid or expired');
    }
    return true;
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    const token = request.cookies['refreshToken'];
    return token ? token : undefined;
  }
}
