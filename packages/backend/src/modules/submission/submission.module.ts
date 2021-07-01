import { forwardRef, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChallengeModule } from '../challenge/challenge.module';
import { SubmissionController } from './controller/submission.controller';
import { SubmissionModel } from './domain/submission.entity';
import { SubmissionResolver } from './resolver/submission.resolver';
import { SubmissionService } from './service/submission.service';

@Module({
  imports: [
    forwardRef(() => SubmissionModel),
    TypeOrmModule.forFeature([SubmissionModel]),
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'challenge-consumer-' + Math.random(),
          },
        },
      },
    ]),
    ChallengeModule,
  ],
  providers: [SubmissionService, SubmissionResolver],
  exports: [SubmissionService],
  controllers: [SubmissionController],
})
export class SubmissionModule {}
