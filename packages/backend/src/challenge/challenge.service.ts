import { Injectable } from '@nestjs/common';
import { ChallengeModel } from './challenge.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChallengeDTO } from './challenge.dto';

@Injectable()
export class ChallengeService {
  constructor(
    @InjectRepository(ChallengeModel)
    private repository: Repository<ChallengeModel>,
  ) {}

  async create(details: ChallengeDTO): Promise<ChallengeModel> {
    const challenge = await this.repository.create(details);

    return await this.repository.save(challenge);
  }

  delete(id: string) {
    return this.repository.delete(id);
  }

  update(id: string, details: ChallengeDTO) {
    return this.repository.update(id, details);
  }

  findAll(): Promise<ChallengeModel[]> {
    return this.repository.find();
  }

  findOne(id: string): Promise<ChallengeModel> {
    return this.repository.findOne(id);
  }
}
