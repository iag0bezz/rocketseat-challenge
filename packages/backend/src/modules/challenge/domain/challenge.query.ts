import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ChallengeQuery {
  @Field({ nullable: true })
  filter?: string;

  @Field({ nullable: true })
  limit?: number;

  @Field({ nullable: true })
  page?: number;

  @Field({ nullable: true })
  startDate?: string;

  @Field({ nullable: true })
  endDate?: string;
}
