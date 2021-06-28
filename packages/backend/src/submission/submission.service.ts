import { Injectable } from '@nestjs/common';
import { SubmissionModel } from './submission.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubmissionDTO } from './submission.dto';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectRepository(SubmissionModel)
    private repository: Repository<SubmissionModel>,
  ) {}

  async create(details: SubmissionDTO): Promise<SubmissionModel> {
    const submission = await this.repository.create(details);

    return await this.repository.save(submission);
  }

  findAll(): Promise<SubmissionModel[]> {
    return this.repository.find();
  }
}
