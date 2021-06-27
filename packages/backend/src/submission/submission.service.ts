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
}
