import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { SubmissionDTO } from './submission.dto';
import { SubmissionResolver } from './submission.resolver';

@Controller('submission')
export class SubmissionController {
  constructor(
    @Inject(SubmissionResolver) private resolver: SubmissionResolver,
  ) {}

  @Get()
  async getSubmissions() {
    return await this.resolver.submissions();
  }

  @Post()
  async submitChallenge(@Body() details: SubmissionDTO) {
    return await this.resolver.submitChallenge(details);
  }
}
