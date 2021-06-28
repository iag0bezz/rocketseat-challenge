import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { KafkaConfig } from './KafkaConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice(KafkaConfig);

  await app.startAllMicroservicesAsync();
  await app.listen(3000);
}

bootstrap();
