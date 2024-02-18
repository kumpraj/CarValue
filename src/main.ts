import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
const cookieSession = require('cookie-session'); // doing this because of config mismatch between nest and cookie-session

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieSession(
    {
      keys: ['asdfasdf']
    }
  ))
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  )
  await app.listen(3000);
}
bootstrap();
