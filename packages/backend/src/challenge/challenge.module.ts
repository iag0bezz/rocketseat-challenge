import { Module, forwardRef } from '@nestjs/common';
import { ChallengeModel } from './challenge.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChallengeService } from './challenge.service';
import { ChallengeResolver } from './challenge.resolver';
import { ChallengeController } from './challenge.controller';

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
