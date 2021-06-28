import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SubmissionDTO } from './submission.dto';
import { SubmissionModel } from './submission.model';
import { SubmissionService } from './submission.service';

@Resolver(() => SubmissionModel)
export class SubmissionResolver {
  constructor(@Inject(SubmissionService) private service: SubmissionService) {}

  @Query(() => [SubmissionModel])
  async submissions(): Promise<SubmissionModel[]> {
    return this.service.findAll();
  }

  @Mutation(() => SubmissionModel)
  async submitChallenge(@Args('submission') details: SubmissionDTO) {
    return this.service.create(details);
  }
}
