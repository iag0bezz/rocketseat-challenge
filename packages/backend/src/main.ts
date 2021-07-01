import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { KafkaConfig } from './kafka';

/*
  PARA DOCUMENTAÇÃO EU PREFERI A UTILIZAÇÃO DO SWAGGER
  JÁ QUE É UMA FERRAMENTA DA PROPRIA FRAMEWORK E POR TER UMA INTERFACE VISUAL QUE DEIXA MELHOR VISÍVEL
  PARA USUÁRIOS QUE FOREM CONSUMIR A API.
*/
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice(KafkaConfig);

  const options = new DocumentBuilder()
    .setTitle('Rocketseat Challenge - Docs')
    .setDescription('Lista de todas requisições da API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.startAllMicroservicesAsync();
  await app.listen(3000);
}

bootstrap();
