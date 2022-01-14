import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './fillter/http-exception.filter';
import { logger } from './middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app
    .use(logger)
    .useGlobalPipes(new ValidationPipe({
      
    }))
    .useGlobalFilters(new HttpExceptionFilter())
    .listen(3000);
}
bootstrap();
