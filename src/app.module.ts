import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ThrottlerModule } from '@nestjs/throttler';
import { GameModule } from './features/game/game.module';
import { CONFIG } from './settings/app.settings';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // MongooseModule.forRoot(`${CONFIG.DB_URL}/${CONFIG.DB_NAME}`),
    MongooseModule.forRoot(`${CONFIG.MONGO_URL}`),
    ThrottlerModule.forRoot([
      {
        ttl: 10000,
        limit: 5,
      },
    ]),
    GameModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
}

