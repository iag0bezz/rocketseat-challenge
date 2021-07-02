import { ChallengeModel } from '../domain/challenge.entity';

export default class ChallengeTest {
  static createChallenge(): ChallengeModel {
    const challenge = new ChallengeModel();
    challenge.title = 'title';
    challenge.description = 'description';
    challenge.id = 'id';
    challenge.date = new Date();

    return challenge;
  }
}
