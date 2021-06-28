/* eslint-disable prettier/prettier */
import { Field, ObjectType } from '@nestjs/graphql';
import { ChallengeModel } from 'src/challenge/challenge.model';
import {
  Column,
  CreateDateColumn,
  ManyToOne,
  Entity,
  PrimaryColumn,
  BeforeInsert,
} from 'typeorm';
import { v4 } from 'uuid';

@Entity('submissions')
@ObjectType()
export class SubmissionModel {
    
    @Field()
    @PrimaryColumn('text')
    id: string;

    @Field(() => ChallengeModel)
    @ManyToOne(() => ChallengeModel, challenge => challenge.submissions)
    challenge: ChallengeModel;

    @Field()
    @Column('text', { nullable: false })
    repositoryUrl: string;

    @Field()
    @Column()
    @CreateDateColumn()
    date: Date;

    @Field()
    @Column('text', { nullable: false })
    status: string;

    @Field()
    @Column('int', { nullable: false })
    grade: number;

    @BeforeInsert()
    beforeInsert() {
      this.id = v4().replace(/-/g, '');
    }
}
