import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet'
import { HttpExceptionFilter } from './fillter/http-exception.filter';
import { logger } from './middleware/logger.middleware';
import csurf from 'csurf';
import session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});

  await app
    .use(logger)
    .useGlobalPipes(new ValidationPipe())
    .use(helmet())
    .useGlobalFilters(new HttpExceptionFilter())
    .listen(3000);
}
bootstrap();
