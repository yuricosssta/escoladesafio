// // Em src/main.ts
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);


//   app.enableCors({
//     origin: true, // Permite todas as origens. Para restringir, substitua true por uma URL específica ou uma função de validação.
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
//     credentials: true, // Permite o envio de cookies e cabeçalhos de autorização
//     allowedHeaders: 'Content-Type, Accept, Authorization',
//     preflightContinue: false,
//     optionsSuccessStatus: 204,
//   });

//   app.useGlobalFilters(new HttpExceptionFilter());

//   // O resto do seu código continua igual...
//   const config = new DocumentBuilder()
//     .setTitle('Escola Desafio API')
//     .setDescription('Escola Desafio API Documentation')
//     .setVersion('1.0')
//     .build();

//   const documentFactory = () => SwaggerModule.createDocument(app, config);
//   SwaggerModule.setup('api', app, documentFactory);

//   await app.listen(Number(process.env.PORT) || 3001, '0.0.0.0');
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true, // Permite todas as origens. Para restringir, substitua true por uma URL específica ou uma função de validação.
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // Permite o envio de cookies e cabeçalhos de autorização
    allowedHeaders: 'Content-Type, Accept, Authorization',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Escola Desafio API')
    .setDescription('Escola Desafio API Documentation')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  // A Vercel injeta a PORT automaticamente
  await app.listen(process.env.PORT || 3000);
}
bootstrap();