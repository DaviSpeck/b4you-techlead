import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  const port = config.get('PORT') || 3000;

  app.setGlobalPrefix('api/v1');

  await app.listen(port);
  console.log(`🚀 Server is running on http://localhost:${port}/api/v1`);
}

bootstrap();