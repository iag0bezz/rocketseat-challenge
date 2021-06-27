/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  CreateDateColumn,
  OneToMany,
  PrimaryColumn,
  BeforeInsert,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { SubmissionModel } from 'src/submission/submission.model';
import { uuid } from 'uuidv4';

@ObjectType()
@Entity('challenges')
export class ChallengeModel {
  @Field()
  @PrimaryColumn('text', { nullable: false })
  id: string;

  @Field()
  @Column('text', { nullable: false })
  title: string;

  @Field()
  @Column('text', { nullable: false })
  description: string;

  @Field()
  @Column()
  @CreateDateColumn()
  date: Date;

  @Field(() => [SubmissionModel], { nullable: true })
  @OneToMany(() => SubmissionModel, model => model.challenge)
  submissions: SubmissionModel[];

  @BeforeInsert()
  beforeInsert() {
    this.id = uuid().replace(/-/g, '');
  }
}
