import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
} from 'typeorm';
import { v4 } from 'uuid';

@ObjectType()
@Entity('submissions')
export class SubmissionModel {
  @Field()
  @PrimaryColumn('text')
  @ApiProperty()
  id: string;

  @Field()
  @Column('text', { nullable: false })
  @ApiProperty()
  repositoryUrl: string;

  @Field()
  @Column('text', { nullable: false })
  @ApiProperty()
  status: string;

  @Field()
  @Column()
  @CreateDateColumn()
  @ApiProperty({ example: 'date' })
  date: Date;

  @Field()
  @Column('int', { nullable: false })
  @ApiProperty({ example: 'number' })
  grade: number;

  @Field()
  @Column('text', { nullable: false })
  @ApiProperty()
  challengeId: string;

  /*
    AQUI EU FIZ UMA PEQUENA MUDANÇA NO CÓDIGO INICIAL
    JÁ QUE, O PRIMEIRO OBJETIVO ERA A UTLIZAÇÃO DO VALOR @PrimaryGeneratedColumn,
    ENTRETANTO HOUVE PROBLEMAS COM O POSTGRES, JÁ QUE NÃO CONSEGUIA TER ACESSO A UM SUPERUSER
    E INSTALAR A EXTENSÃO OBRIGATÓRIA, NO CASO `UUID-OSSP`
    E UTILIZEI DESTA FORMA PARA GERAR O SEU ID ÚNICO PARA CADA VALOR.
  */
  @BeforeInsert()
  beforeInsert() {
    this.id = v4().replace(/-/g, '');
  }
}
