import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { createServer, Server } from 'http';

let cachedServer: Server;

export default async function handler(req: any, res: any) {
  if (!cachedServer) {
    const expressApp = express();
    const adapter = new ExpressAdapter(expressApp);
    const app = await NestFactory.create(AppModule, adapter);

    await app.init();
    cachedServer = createServer(expressApp);
  }

  return cachedServer.emit('request', req, res);
}
