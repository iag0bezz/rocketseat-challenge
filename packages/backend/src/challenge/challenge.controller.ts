import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ChallengeDTO } from './challenge.dto';
import { ChallengeResolver } from './challenge.resolver';

@Controller('challenge')
export class ChallengeController {
  constructor(@Inject(ChallengeResolver) private resolver: ChallengeResolver) {}

  @Get()
  async getChallenges() {
    return await this.resolver.challenges();
  }

  @Post()
  async createChallenge(@Body() details: ChallengeDTO) {
    return await this.resolver.createChallenge(details);
  }
}
