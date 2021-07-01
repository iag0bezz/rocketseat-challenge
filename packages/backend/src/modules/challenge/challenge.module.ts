import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChallengeController } from './controller/challenge.controller';
import { ChallengeModel } from './domain/challenge.entity';
import { ChallengeResolver } from './resolver/challenge.resolver';
import { ChallengeService } from './service/challenge.service';

@Module({
  imports: [
    forwardRef(() => ChallengeModel),
    TypeOrmModule.forFeature([ChallengeModel]),
  ],
  providers: [ChallengeService, ChallengeResolver],
  exports: [ChallengeService],
  controllers: [ChallengeController],
})
export class ChallengeModule {}
