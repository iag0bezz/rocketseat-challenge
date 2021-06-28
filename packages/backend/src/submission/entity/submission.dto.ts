/* eslint-disable prettier/prettier */
import { Field, InputType } from '@nestjs/graphql';
@InputType()
export class SubmissionDTO {
  @Field()
  challengeId: string;

  @Field()
  repositoryUrl: string;

  @Field()
  status: string;

  @Field()
  grade: number;
}