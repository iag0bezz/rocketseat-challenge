import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ChallengeModule } from './challenge/challenge.module';
import { SubmissionModule } from './submission/submission.module';

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
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
