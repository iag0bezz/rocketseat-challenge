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
import { SubmissionModel } from 'src/submission/entity/submission.model';
import { v4 } from 'uuid';

@ObjectType()
@Entity('challenges')
export class ChallengeModel {
  @Field()
  @PrimaryColumn('text')
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

  @Field(() => [SubmissionModel])
  @OneToMany(() => SubmissionModel, submission => submission.challenge, { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true })
  submissions: Promise<SubmissionModel[]>;

  @BeforeInsert()
  beforeInsert() {
    this.id = v4().replace(/-/g, '');
  }
}
