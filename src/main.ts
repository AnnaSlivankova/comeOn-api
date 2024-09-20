import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CONFIG } from './settings/app.settings';
import { applyAppSettings } from './settings/apply-app-settings';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  applyAppSettings(app);

  await app.listen(CONFIG.PORT, () => {
    console.log('App starting listen on port: ', CONFIG.PORT);
    return;
  });
}

bootstrap();
