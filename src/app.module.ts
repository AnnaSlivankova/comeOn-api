import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ThrottlerModule } from '@nestjs/throttler';
import { GameModule } from './features/game/game.module';
import { CONFIG } from './settings/app.settings';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(`${CONFIG.DB_URL}/${CONFIG.DB_NAME}`),
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
export class AppModule {}

