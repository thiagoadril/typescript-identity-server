import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Nest } from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<Nest>(AppModule);
  await app.listen(3000);
}

bootstrap();
