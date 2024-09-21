import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { applyAppSettings } from './settings/apply-app-settings';
import { config } from 'dotenv';
import * as process from 'process';

config();

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  applyAppSettings(app);

  await app.listen(PORT, () => {
    console.log('App starting listen on port: ', PORT);
    return;
  });
}

bootstrap();
