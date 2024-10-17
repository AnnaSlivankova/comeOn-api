import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { BcryptService } from '../../../infrastructure/services/bcrypt.service';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../../users/infrastructure/users.repository';
import { LoginInputModel } from '../api/models/login.input.model';
import { CONFIG } from '../../../settings/app.settings';
import { TokensBlackListRepository } from '../infrastructure/tokens-black-list.repository';

@Injectable()
export class AuthService {
  constructor(
    private bcryptService: BcryptService,
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
    private tokensBLRepository: TokensBlackListRepository,
  ) {
  }

  async login(dto: LoginInputModel): Promise<{
    refreshToken: string;
    accessToken: string;
  }> {
    const { name, surname, password } = dto;

    const user = await this.usersRepository.getUserByFullName(name, surname);
    if (!user) throw new UnauthorizedException();
    const isPasswordValid = await this.bcryptService.compareHashes(
      password,
      user.hash,
    );
    if (!isPasswordValid) throw new UnauthorizedException();

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { userId: user.id },
        { expiresIn: CONFIG.ACCESS_TTL },
      ),
      this.jwtService.signAsync(
        { userId: user.id },
        { expiresIn: CONFIG.REFRESH_TTL },
      ),
    ]);

    return { accessToken, refreshToken };
  }

  async logout(refToken: string, accToken: string): Promise<boolean> {
    const isPuttedInBlackList = this.tokensBLRepository.putTokensInBL([
      { token: refToken },
      { token: accToken },
    ]);
    if (!isPuttedInBlackList) throw new BadRequestException();

    return isPuttedInBlackList;
  }

  async refreshTokens(
    userId: string,
    refToken: string,
  ): Promise<{
    refreshToken: string;
    accessToken: string;
  }> {
    const user = await this.usersRepository.getUserById(userId);
    if (!user) throw new UnauthorizedException();

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { userId: user.id },
        { expiresIn: CONFIG.ACCESS_TTL },
      ),
      this.jwtService.signAsync(
        { userId: user.id },
        { expiresIn: CONFIG.REFRESH_TTL },
      ),
    ]);

    const isPuttedInBlackList = await this.tokensBLRepository.putTokensInBL([
      { token: refToken },
    ]);
    if (!isPuttedInBlackList) throw new BadRequestException();

    return { refreshToken, accessToken };
  }
}
