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
@Entity('challenges')
export class ChallengeModel {
  @Field()
  @PrimaryColumn('text')
  @ApiProperty()
  id: string;

  @Field()
  @Column('text', { nullable: false })
  @ApiProperty()
  title: string;

  @Field()
  @Column('text', { nullable: false })
  @ApiProperty()
  description: string;

  @Field()
  @Column()
  @CreateDateColumn()
  @ApiProperty({ example: 'date' })
  date: Date;

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
