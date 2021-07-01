import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SubmissionDomain } from '../domain/submission.domain';
import { SubmissionModel } from '../domain/submission.entity';
import { SubmissionQuery } from '../domain/submission.query';
import { SubmissionService } from '../service/submission.service';

@Resolver(() => SubmissionModel)
export class SubmissionResolver {
  constructor(@Inject(SubmissionService) private service: SubmissionService) {}

  @Query(() => [SubmissionModel])
  async submissions(
    @Args('query', { nullable: true, defaultValue: {} })
    query: SubmissionQuery,
  ): Promise<SubmissionModel[]> {
    return this.service.findAll(query);
  }

  @Mutation(() => SubmissionModel)
  async submitChallenge(@Args('submission') details: SubmissionDomain) {
    return this.service.create(details);
  }
}
