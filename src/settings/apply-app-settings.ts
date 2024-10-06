import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { useContainer } from 'class-validator';
import { AppModule } from '../app.module';
import * as cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from '../infrastructure/exeption-filters/http-exeption-filter';

export const applyAppSettings = (app: INestApplication) => {
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175',
      'https://come-on-psi.vercel.app',
      'https://hanna-lib.ru',
      'www.hanna-lib.ru',
    ],
    credentials: true,
  });
  app.use(cookieParser());
  setAppPipes(app);
  setAppExceptionsFilters(app);
};

const setAppPipes = (app: INestApplication) => {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: true,
      exceptionFactory: (errors) => {
        const customErrors = [];
        errors.forEach((err) => {
          // @ts-ignore
          const constraintKeys = Object.keys(err.constraints);
          constraintKeys.forEach((cKey) => {
            // @ts-ignore
            const msg = err.constraints[cKey];
            // @ts-ignore
            customErrors.push({ field: err.property, message: msg });
          });
        });
        throw new BadRequestException(customErrors);
      },
    }),
  );
};

const setAppExceptionsFilters = (app: INestApplication) => {
  app.useGlobalFilters(new HttpExceptionFilter());
};
