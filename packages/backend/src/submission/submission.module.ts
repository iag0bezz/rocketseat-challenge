import { Module, forwardRef } from '@nestjs/common';
import { SubmissionModel } from './submission.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubmissionResolver } from './submission.resolver';
import { SubmissionService } from './submission.service';

@Module({
  imports: [
    forwardRef(() => SubmissionModel),
    TypeOrmModule.forFeature([SubmissionModel]),
  ],
  providers: [SubmissionService, SubmissionResolver],
  exports: [SubmissionService],
  controllers: [],
})
export class SubmissionModule {}
