import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    allowedHeaders: ['content-type'],
    origin: process.env.frontUrl,
    credentials: true,
  });
  
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
