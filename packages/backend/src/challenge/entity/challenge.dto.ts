/* eslint-disable prettier/prettier */
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ChallengeDTO {
  @Field()
  title: string;

  @Field()
  description: string;
}
