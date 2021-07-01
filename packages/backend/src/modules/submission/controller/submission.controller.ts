import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { SubmissionDomain } from '../domain/submission.domain';
import { SubmissionModel } from '../domain/submission.entity';
import { SubmissionQuery } from '../domain/submission.query';
import { SubmissionResolver } from '../resolver/submission.resolver';

@Controller('submission')
export class SubmissionController {
  constructor(
    @Inject(SubmissionResolver) private resolver: SubmissionResolver,
  ) {}

  @ApiOkResponse({
    description: 'Returns the listing of all submissions created.',
    isArray: true,
    type: SubmissionModel,
  })
  @Get()
  async findAll(@Query() query: SubmissionQuery) {
    return await this.resolver.submissions(query);
  }

  @ApiOkResponse({
    description: 'Create a new submission',
    type: SubmissionModel,
  })
  @ApiResponse({
    status: 400,
    description: 'No challenges found with this ID. | Invalid repository URL.',
  })
  @Post()
  async submitChallenge(@Body() details: SubmissionDomain) {
    details.status = 'Pending';
    details.grade = 0;

    return await this.resolver.submitChallenge(details);
  }
}
