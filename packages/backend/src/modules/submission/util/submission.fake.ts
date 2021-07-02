import { SubmissionModel } from '../domain/submission.entity';

export default class SubmissionTest {
  static createValidSubmission(): SubmissionModel {
    const submission = new SubmissionModel();
    submission.id = 'id';
    submission.repositoryUrl =
      'https://github.com/iag0bezz/rocketseat-challenge';
    submission.date = new Date();
    submission.grade = 0;
    submission.status = 'Pending';
    submission.challengeId = 'id';

    return submission;
  }

  static createInvalidRepoSubmission(): SubmissionModel {
    const submission = new SubmissionModel();
    submission.id = 'id';
    submission.repositoryUrl = 'repository';
    submission.date = new Date();
    submission.grade = 0;
    submission.status = 'Pending';
    submission.challengeId = 'challenge-id';

    return submission;
  }
}
