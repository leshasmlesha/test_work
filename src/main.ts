import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClientOptions, Transport } from '@nestjs/microservices';
import { ConfigType } from '@nestjs/config';
import configuration from './Config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());
  const natsConfig = app.get<ConfigType<typeof configuration>>(
    configuration.KEY,
  );
  app.connectMicroservice<ClientOptions>({
    transport: Transport.NATS,
    options: { servers: [natsConfig.server] },
  });
  const config = new DocumentBuilder()
    .setTitle('Тестовый NATS приложение')
    .setDescription('Здесь описана документация')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  await app.startAllMicroservices();
  SwaggerModule.setup('docs', app, document);
  await app.listen(8080, '0.0.0.0');
  console.log(`Сервер запущен на ${await app.getUrl()}`);
}
bootstrap();
