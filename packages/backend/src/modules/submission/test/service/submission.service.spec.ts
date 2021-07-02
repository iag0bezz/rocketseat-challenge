import { ClientsModule, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import ChallengeTest from '../../../../modules/challenge/util/challenge.fake';
import { ChallengeModel } from '../../../../modules/challenge/domain/challenge.entity';
import { ChallengeService } from '../../../../modules/challenge/service/challenge.service';
import { SubmissionModel } from '../../domain/submission.entity';
import { SubmissionService } from '../../service/submission.service';
import SubmissionTest from '../../util/submission.fake';

describe('SubmissionService', () => {
  let service: SubmissionService;

  const repository = {
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockReturnValue(repository.find()),
    })),
  };

  const challengeRepository = {
    findOne: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.register([
          {
            name: 'KAFKA_SERVICE',
            transport: Transport.KAFKA,
            options: {
              client: {
                brokers: ['localhost:9092'],
              },
              consumer: {
                groupId: 'challenge-consumer-' + Math.random(),
              },
            },
          },
        ]),
      ],
      providers: [
        SubmissionService,
        {
          provide: getRepositoryToken(SubmissionModel),
          useValue: repository,
        },
        ChallengeService,
        {
          provide: getRepositoryToken(ChallengeModel),
          useValue: challengeRepository,
        },
      ],
    }).compile();

    jest.useFakeTimers();

    service = module.get<SubmissionService>(SubmissionService);
    service.onModuleInit();
  });

  beforeEach(() => {
    repository.find.mockReset();
    repository.save.mockReset();
    repository.create.mockReset();

    challengeRepository.findOne.mockReset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When find all submissions', () => {
    it('should be list all submissions', async () => {
      const submission = SubmissionTest.createValidSubmission();
      repository.find.mockReturnValue([submission, submission]);
      const submissions = await service.findAll({});

      expect(submissions).toHaveLength(2);
      expect(repository.find).toHaveBeenCalledTimes(1);
    });
  });

  /*
    É NECESSÁRIO TER O MICROSERVIÇO CORRECTIONS RODANDO PARA ESTE TESTE FUNCIONAR CORRETAMENTE.
  */
  describe('When create a submission', () => {
    it('should create a submission', async () => {
      challengeRepository.findOne.mockReturnValue(
        ChallengeTest.createChallenge(),
      );

      const submission = SubmissionTest.createValidSubmission();
      repository.save.mockReturnValue(submission);
      repository.create.mockReturnValue(submission);
      const result = await service.create(submission);

      expect(result).toMatchObject({ id: 'id' });
      expect(repository.save).toHaveBeenCalledTimes(2);
      expect(repository.create).toHaveBeenCalledTimes(1);
      expect(challengeRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });
});
