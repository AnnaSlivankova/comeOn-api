import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  InternalServerErrorException,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { PATH } from '../../../settings/app.settings';
import { AuthBearerGuard } from '../../../infrastructure/guards/auth.bearer.guard';
import { UsersQueryRepository } from '../../users/infrastructure/users-query-repository';
import { LoginInputModel } from './models/login.input.model';
import { AuthService } from '../application/auth.service';
import { Request, Response } from 'express';
import { RefreshTokenGuard } from '../../../infrastructure/guards/refresh.token.guard';

@Controller(PATH.AUTH)
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersQueryRepository: UsersQueryRepository,
  ) {
  }

  @UseGuards(AuthBearerGuard)
  @Get('/me')
  @HttpCode(200)
  async me(@Req() req: Request) {
    const userId = req['user'].userId;
    const user = await this.usersQueryRepository.getById(userId);
    if (!user) throw new UnauthorizedException();

    return user;
  }

  @Post('/login')
  @HttpCode(200)
  async login(
    @Body() inputDto: LoginInputModel,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const { refreshToken, accessToken } = await this.authService.login(
      inputDto,
    );

    this.setCookie(res, refreshToken);
    res.status(200).send({ accessToken });
    return;
  }

  @UseGuards(RefreshTokenGuard)
  @Post('/logout')
  @HttpCode(200)
  async logout(
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const [type, accToken] = req.headers.authorization?.split(' ') ?? [];
    const userId = req['userId'];
    const refToken = req.cookies['refreshToken'];

    if (!accToken || !refToken) {
      throw new BadRequestException('Tokens are required');
    }

    const isLogout = await this.authService.logout(refToken, accToken);
    if (!isLogout) throw new InternalServerErrorException();
    this.clearCookie(res);
    res.sendStatus(204);
    return;
  }

  @UseGuards(RefreshTokenGuard)
  @Post('/refresh-token')
  @HttpCode(200)
  async refreshTokens(@Req() req: Request, @Res() res: Response) {
    const userId = req['userId'];
    const refToken = req.cookies['refreshToken'];

    const { refreshToken, accessToken } = await this.authService.refreshTokens(
      userId,
      refToken,
    );

    this.setCookie(res, refreshToken);
    res.status(200).send({ accessToken });
    return;
  }

  private setCookie(res: Response, token: string) {
    res.cookie('refreshToken', token, {
      httpOnly: true,
      secure: true,
      // secure: process.env.NODE_ENV !== "development"
    });
  }

  private clearCookie(res: Response) {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      // secure: process.env.NODE_ENV !== "development"
    });
  }
}
