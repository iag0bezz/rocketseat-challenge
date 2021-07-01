import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class ChallengeDomain {
  @Field()
  @ApiProperty()
  title: string;

  @Field()
  @ApiProperty()
  description: string;
}
