import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  const configSwagger = new DocumentBuilder()
    .setTitle('B4YOU TECHLEAD API')
    .setDescription('Documentação da API de autenticação e campanhas')
    .setVersion('1.0')
    .addBearerAuth()
    .setContact('Davi Speck', 'https://www.linkedin.com/in/davi-speck-a872a71b7/', 'davispeck86@gmail.com')
    .build();

  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api/docs', app, document);

  await app.enableCors({
    origin: ['http://localhost:3000'], // ou '*' se for só ambiente de desenvolvimento
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    }),
  );

  const config = app.get(ConfigService);
  const port = config.get('PORT') || 3000;

  await app.listen(port);
  console.log(`🚀 Server is running on http://localhost:${port}/api/v1`);
}

bootstrap();