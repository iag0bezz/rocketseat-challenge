/* eslint-disable prettier/prettier */
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ChallengeDTO {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  date?: Date;
}
