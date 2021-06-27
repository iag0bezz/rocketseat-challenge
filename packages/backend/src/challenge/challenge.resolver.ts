import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ChallengeDTO } from './challenge.dto';
import { ChallengeModel } from './challenge.model';
import { ChallengeService } from './challenge.service';

@Resolver(() => ChallengeModel)
export class ChallengeResolver {
  constructor(@Inject(ChallengeService) private service: ChallengeService) {}

  @Query(() => [ChallengeModel])
  async challenges(): Promise<ChallengeModel[]> {
    return await this.service.findAll();
  }

  @Mutation(() => ChallengeModel)
  async createChallenge(@Args('challenge') details: ChallengeDTO) {
    return await this.service.create(details);
  }

  @Mutation(() => ChallengeModel)
  async updateChallenge(@Args('challenge') details: ChallengeDTO) {
    return await this.service.update(details.id, details);
  }

  @Mutation(() => ChallengeModel)
  async deleteChallenge(@Args('id') id: string) {
    return await this.service.delete(id);
  }
}
