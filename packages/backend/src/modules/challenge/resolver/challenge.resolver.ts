import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { ChallengeDomain } from '../domain/challenge.domain';
import { ChallengeModel } from '../domain/challenge.entity';
import { ChallengeQuery } from '../domain/challenge.query';
import { ChallengeService } from '../service/challenge.service';

@Resolver(() => ChallengeModel)
export class ChallengeResolver {
  constructor(@Inject(ChallengeService) private service: ChallengeService) {}

  @Query(() => [ChallengeModel])
  async challenges(
    @Args('query', { nullable: true, defaultValue: {} })
    query: ChallengeQuery,
  ): Promise<ChallengeModel[]> {
    return this.service.findAll(query);
  }

  @Mutation(() => ChallengeModel)
  async create(
    @Args('challenge') details: ChallengeDomain,
  ): Promise<ChallengeModel> {
    return this.service.create(details);
  }

  @Mutation(() => ChallengeModel)
  async update(
    @Args('id') id: string,
    @Args('challenge') details: ChallengeDomain,
  ): Promise<ChallengeModel> {
    return this.service.update(id, details);
  }

  @Mutation(() => ChallengeModel)
  async delete(@Args('id') id: string) {
    return this.service.delete(id);
  }
}
