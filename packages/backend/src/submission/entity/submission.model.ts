/* eslint-disable prettier/prettier */
import { Field, ObjectType } from '@nestjs/graphql';
import { ChallengeModel } from 'src/challenge/entity/challenge.model';
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

    @Field()
    @Column('text', { nullable: false })
    challengeId: string;

    @Field(() => ChallengeModel)
    @ManyToOne(() => ChallengeModel, challenge => challenge.submissions, { nullable: false })
    challenge: Promise<ChallengeModel>;

    @BeforeInsert()
    beforeInsert() {
      this.id = v4().replace(/-/g, '');
    }
}
