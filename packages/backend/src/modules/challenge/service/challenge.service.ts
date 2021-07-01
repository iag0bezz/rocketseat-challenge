import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChallengeDomain } from '../domain/challenge.domain';
import { ChallengeModel } from '../domain/challenge.entity';
import { ChallengeQuery } from '../domain/challenge.query';

@Injectable()
export class ChallengeService {
  constructor(
    @InjectRepository(ChallengeModel)
    private repository: Repository<ChallengeModel>,
  ) {}

  async create(details: ChallengeDomain): Promise<ChallengeModel> {
    const challenge = await this.repository.create(details);

    return this.repository.save(challenge);
  }

  async delete(id: string) {
    const challenge = await this.findOne(id);

    if (challenge != null) {
      await this.repository.delete(id);
      return challenge;
    }
    return null;
  }

  async update(id: string, details: ChallengeDomain): Promise<ChallengeModel> {
    const challenge = await this.findOneOrFail(id);

    challenge.title = details.title;
    challenge.description = details.description;

    return this.repository.save(challenge);
  }

  findAll(query: ChallengeQuery): Promise<ChallengeModel[]> {
    const builder = this.repository.createQueryBuilder();

    builder.where(
      `title LIKE '%${query.filter || ''}%' OR description LIKE '%${
        query.filter || ''
      }%'`,
    );

    if (query.startDate && query.endDate) {
      builder.andWhere('date BETWEEN :start AND :end', {
        start: query.startDate,
        end: query.endDate,
      });
    }

    if (query.limit) {
      builder.limit(query.limit);
    }

    if (query.page) {
      builder.skip(query.page * query.limit);
    }

    return builder.getMany();
  }

  findOne(id: string): Promise<ChallengeModel> {
    return this.repository.findOne(id);
  }

  findOneOrFail(id: string): Promise<ChallengeModel> {
    return this.repository.findOneOrFail(id);
  }
}
