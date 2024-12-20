import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { applyAppSettings } from './settings/apply-app-settings';
import { config } from 'dotenv';
import * as process from 'process';
// import { HostCheckMiddleware } from './infrastructure/middlewares/host-check-middleware';

config();

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.use(new HostCheckMiddleware().use);

  applyAppSettings(app);

  await app.listen(PORT, () => {
    console.log('App starting listen on port: ', PORT);
    return;
  });
}

bootstrap();
