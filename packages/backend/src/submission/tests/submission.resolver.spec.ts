import { Test, TestingModule } from '@nestjs/testing';
import { SubmissionResolver } from '../submission.resolver';

describe('SubmissionResolver', () => {
  let resolver: SubmissionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubmissionResolver],
    }).compile();

    resolver = module.get<SubmissionResolver>(SubmissionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
