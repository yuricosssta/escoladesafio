import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { createServer, Server } from 'http';

let server: Server;

export default async function handler(req: any, res: any) {
  if (!server) {
    const expressApp = express();
    const adapter = new ExpressAdapter(expressApp);
    const app = await NestFactory.create(AppModule, adapter, { logger: false });

    await app.init();
    server = createServer(expressApp);
  }

  server.emit('request', req, res);
}
