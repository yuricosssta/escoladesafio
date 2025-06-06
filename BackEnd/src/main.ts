import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Ativa o CORS (permite que o app Expo acesse a API)
  app.enableCors({
    origin: '*', // Em desenvolvimento, pode deixar assim. Em produção, defina o IP ou domínio do app.
  });

  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Tech Challenge Api')
    .setDescription('Tech Challenge API Documentation')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  // ✅ Escuta em todas as interfaces de rede, incluindo IP local
  await app.listen(Number(process.env.PORT) || 3001, '0.0.0.0');
}
bootstrap();
