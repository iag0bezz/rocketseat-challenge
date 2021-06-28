import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { Client, ClientKafka } from '@nestjs/microservices';
import { KafkaConfig } from './KafkaConfig';

@Controller()
export class AppController implements OnModuleInit {
  @Client(KafkaConfig)
  client: ClientKafka;

  async onModuleInit() {
    this.client.subscribeToResponseOf('challenge.correction');
    await this.client.connect();
  }

  @Get()
  async getHello() {
    console.log('Starting operations');

    return await this.client.send('challenge.correction', {
      submissionId: '1',
      repositoryUrl: 'https://github.com/iag0bezz/',
    });
  }
}
