import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ThrottlerModule } from '@nestjs/throttler';
import { GameModule } from './features/game/game.module';
import { CONFIG } from './settings/app.settings';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './features/users/users.module';
import { AuthModule } from './features/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
// import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(`${CONFIG.DB_URL}/${CONFIG.DB_NAME}`),
    // MongooseModule.forRoot(`${CONFIG.MONGO_URL}`),
    ThrottlerModule.forRoot([
      {
        ttl: 10000,
        limit: 5,
      },
    ]),
    JwtModule.register({
      global: true,
      secret: CONFIG.JWT_SECRET as string,
      signOptions: { expiresIn: CONFIG.ACCESS_TTL },
    }),
    GameModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
