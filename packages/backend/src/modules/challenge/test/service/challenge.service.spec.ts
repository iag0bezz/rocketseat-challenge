import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ChallengeModel } from '../../domain/challenge.entity';
import { ChallengeService } from '../../service/challenge.service';
import ChallengeTest from '../../util/challenge.fake';

describe('ChallengeService', () => {
  let service: ChallengeService;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockReturnValue(mockRepository.find()),
    })),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChallengeService,
        {
          provide: getRepositoryToken(ChallengeModel),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ChallengeService>(ChallengeService);
  });

  beforeEach(() => {
    mockRepository.find.mockReset();
    mockRepository.findOne.mockReset();
    mockRepository.save.mockReset();
    mockRepository.create.mockReset();
    mockRepository.update.mockReset();
    mockRepository.delete.mockReset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When find all challenges', () => {
    it('should be list all challenges', async () => {
      const challenge = ChallengeTest.createChallenge();
      mockRepository.find.mockReturnValue([challenge, challenge]);
      const challenges = await service.findAll({});

      expect(challenges).toHaveLength(2);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('When find one challenge', () => {
    it('should find a existing challenge', async () => {
      const challenge = ChallengeTest.createChallenge();
      mockRepository.findOne.mockReturnValue(challenge);
      const result = await service.findOne('id');

      expect(result).toMatchObject({ id: 'id' });
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });
    it('should return a error when does not to find a challenge', async () => {
      mockRepository.findOne.mockReturnValue(null);

      expect(service.findOne('id')).toEqual(null);
      expect(mockRepository.findOne).toBeCalledTimes(1);
    });
  });

  describe('When create a challenge', () => {
    it('should create a challenge', async () => {
      const challenge = ChallengeTest.createChallenge();
      mockRepository.save.mockReturnValue(challenge);
      mockRepository.create.mockReturnValue(challenge);
      const result = await service.create(challenge);

      expect(result).toMatchObject({ id: 'id' });
      expect(mockRepository.save).toHaveBeenCalledTimes(1);
      expect(mockRepository.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('When update a challenge', () => {
    it('should update a challenger', async () => {
      const challenge = ChallengeTest.createChallenge();
      const updatedChallenge = { title: 'updated title' };
      mockRepository.findOne.mockReturnValue(challenge);
      mockRepository.update.mockReturnValue({
        ...challenge,
        ...updatedChallenge,
      });
      mockRepository.create.mockReturnValue({
        ...challenge,
        ...updatedChallenge,
      });

      const result = await service.update('id', {
        ...challenge,
        ...updatedChallenge,
      });

      expect(result).toMatchObject(updatedChallenge);
      expect(mockRepository.create).toHaveBeenCalledTimes(1);
      expect(mockRepository.update).toHaveBeenCalledTimes(1);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('When delete a challenge', () => {
    it('should delete a existing challenge', async () => {
      const challenge = ChallengeTest.createChallenge();
      mockRepository.findOne.mockReturnValue(challenge);
      mockRepository.delete.mockReturnValue(challenge);

      const deleted = await service.delete('id');

      expect(deleted).toMatchObject({ id: 'id' });
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockRepository.delete).toHaveBeenCalledTimes(1);
    });
  });
});
