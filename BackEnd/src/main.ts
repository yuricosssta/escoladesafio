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
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { INestApplication } from '@nestjs/common';

// Variável para armazenar o servidor em cache (evita cold starts lentos na Vercel)
let cachedServer: any;

// Função para configurar a aplicação (CORS, Swagger, Filters)
// Separamos isso para usar tanto no modo Serverless quanto no Local
async function configureApp(app: INestApplication) {
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
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
}

// --- LÓGICA SERVERLESS (VERCEL) ---
async function bootstrapServerless() {
  if (!cachedServer) {
    const expressApp = express();
    const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));

    await configureApp(nestApp);
    await nestApp.init();

    cachedServer = expressApp;
  }
  return cachedServer;
}

// Esta é a função que a Vercel vai chamar!
export default async function handler(req: any, res: any) {
  const server = await bootstrapServerless();
  return server(req, res);
}

// --- LÓGICA LOCAL (DEV) ---
// Se NÃO estiver rodando na Vercel, inicia o servidor normalmente
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  async function bootstrapLocal() {
    const app = await NestFactory.create(AppModule);
    await configureApp(app);
    await app.listen(Number(process.env.PORT) || 3001, '0.0.0.0');
    console.log(`Aplicação rodando localmente na porta: ${Number(process.env.PORT) || 3001}`);
  }
  bootstrapLocal();
}