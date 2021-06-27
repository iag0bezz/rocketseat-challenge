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
import { uuid } from 'uuidv4';

@Entity('submissions')
@ObjectType()
export class SubmissionModel {
    
    @Field()
    @PrimaryColumn('text', { nullable: false })
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
      this.id = uuid().replace(/-/g, '');
    }
}
