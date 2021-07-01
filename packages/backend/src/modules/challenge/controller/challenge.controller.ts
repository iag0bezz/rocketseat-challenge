import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { ChallengeDomain } from '../domain/challenge.domain';
import { ChallengeModel } from '../domain/challenge.entity';
import { ChallengeQuery } from '../domain/challenge.query';
import { ChallengeResolver } from '../resolver/challenge.resolver';

@Controller('challenge')
export class ChallengeController {
  constructor(@Inject(ChallengeResolver) private resolver: ChallengeResolver) {}

  @ApiOkResponse({
    description: 'Returns the listing of all challenges created.',
    isArray: true,
    type: ChallengeModel,
  })
  @Get()
  async findAll(@Query() query: ChallengeQuery) {
    return await this.resolver.challenges(query);
  }

  @ApiCreatedResponse({
    description: 'Create a new challenge',
    type: ChallengeModel,
  })
  @Post()
  async create(@Body() details: ChallengeDomain) {
    return await this.resolver.create(details);
  }

  @ApiOkResponse({
    description: 'Update an already created challenge',
    type: ChallengeModel,
  })
  @ApiNotFoundResponse({
    description: 'No challenges found with this ID.',
  })
  @Put(':id')
  async update(@Param('id') id: string, @Body() details: ChallengeDomain) {
    const update = await this.resolver.update(id, details);

    if (update == null) {
      return { error: 'No challenges found with this ID.' };
    }

    return update;
  }

  @ApiOkResponse({
    description: 'Delete an already created challenge',
    type: ChallengeModel,
  })
  @ApiNotFoundResponse({
    description: 'No challenges found with this ID.',
  })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deleted = await this.resolver.delete(id);

    if (deleted == null) {
      return { error: 'No challenges found with this ID.' };
    }

    return deleted;
  }
}
