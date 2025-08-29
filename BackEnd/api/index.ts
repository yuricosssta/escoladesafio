import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { Server } from 'http';

let cachedServer: Server;

export default async function handler(req: any, res: any) {
  if (!cachedServer) {
    const expressApp = express();
    const adapter = new ExpressAdapter(expressApp);
    const app = await NestFactory.create(AppModule, adapter);

    await app.init();
    cachedServer = expressApp.listen(0); // 🔹 aqui está a correção
  }

  return cachedServer.emit('request', req, res);
}
