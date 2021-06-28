/* eslint-disable prettier/prettier */
import { KafkaOptions, Transport } from '@nestjs/microservices';

export const KafkaConfig: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'challenge',
      brokers: ['localhost:9092'],
    },
    consumer: {
      groupId: 'challenge-consumer',
    },
  },
};
