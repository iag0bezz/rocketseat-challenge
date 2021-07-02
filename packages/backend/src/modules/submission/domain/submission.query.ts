import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SubmissionQuery {
  @Field({ nullable: true })
  challenge?: string;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  limit?: number;

  @Field({ nullable: true })
  page?: number;

  @Field({ nullable: true })
  startDate?: string;

  @Field({ nullable: true })
  endDate?: string;
}
