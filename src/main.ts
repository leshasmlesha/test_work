import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());
  const config = new DocumentBuilder()
    .setTitle('Тестовый NATS приложение')
    .setDescription('Здесь описана документация')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);
  await app.listen(8080, '0.0.0.0');
  console.log(`Сервер запущен на ${await app.getUrl()}`);
}
bootstrap();
