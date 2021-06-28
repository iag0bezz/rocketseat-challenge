/* eslint-disable prettier/prettier */
import { Field, InputType } from '@nestjs/graphql';
@InputType()
export class SubmissionDTO {
  @Field()
  id?: string;

  @Field()
  challengeId: string;

  @Field()
  repositoryUrl: string;

  @Field()
  date?: Date;

  @Field()
  status: string;

  @Field()
  grade: number;
}