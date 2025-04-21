import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ValidationExceptionFilter } from './common/filters/validation-exception.filter';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new ValidationExceptionFilter());

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    // origin: 'http://localhost:8025',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
