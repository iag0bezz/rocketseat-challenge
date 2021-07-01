import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class SubmissionDomain {
  @Field()
  @ApiProperty()
  challengeId: string;

  @Field()
  @ApiProperty()
  repositoryUrl: string;

  @Field({ nullable: true, defaultValue: 'Pending' })
  @ApiProperty({ default: 'Pending', required: false })
  status: string;

  @Field({ nullable: true, defaultValue: 0 })
  @ApiProperty({ default: 0, required: false })
  grade: number;
}
