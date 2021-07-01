import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChallengeModule } from './modules/challenge/challenge.module';
import { SubmissionModule } from './modules/submission/submission.module';

@Module({
  imports: [
    GraphQLModule.forRoot({ autoSchemaFile: 'schema.gql' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'password',
      database: 'database',
      entities: ['./dist/**/*{.ts,.js}'],
      synchronize: true,
    }),
    ChallengeModule,
    SubmissionModule,
  ],
})
export class AppModule {}
