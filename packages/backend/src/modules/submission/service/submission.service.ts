import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { ChallengeService } from '../../../modules/challenge/service/challenge.service';
import { isValidUrl } from '../../../utils/isValidUrl';
import { Repository } from 'typeorm';
import { SubmissionDomain } from '../domain/submission.domain';
import { SubmissionModel } from '../domain/submission.entity';
import { SubmissionQuery } from '../domain/submission.query';

@Injectable()
export class SubmissionService implements OnModuleInit {
  constructor(
    @InjectRepository(SubmissionModel)
    private repository: Repository<SubmissionModel>,
    @Inject(ChallengeService)
    private challengeService: ChallengeService,
    @Inject('KAFKA_SERVICE')
    private client: ClientKafka,
  ) {}

  onModuleInit() {
    this.client.subscribeToResponseOf('challenge.correction');
  }

  /*
    NESTA PARTE TIVE ALGUNS PROBLEMAS EM QUESTÃO DE PENSAR EM UMA LÓGICA FUNCIONAL,
    E ESSE FOI MEU RESULTADO FINAL, ALGO SIMPLES PORÉM COM SUAS FUNCIONALIDADES DIRETAS
    
    FLUXO:
     - A SUBMISSÃO COM SEUS VALORES INICIAIS SÃO CADASTRADOS NO BANCO DE DADOS, SENDO ASSIM MARCADO COMO 'PENDING'
     - ELE INICIA SUAS SÉRIES DE VERIFICAÇÕES SE ESTÁ APTO PARA SE COMUNICAR COM O APACHE KAFKA E GANHAR SUA CORREÇÃO
     - SE TODOS DADOS TIVEREM CORRETOS O APACHE KAFKA IRÁ SER COMUNICADO E ASSIM IRÁ O RETORNAR SUA NOTA E SERÁ MARCADO COMO 'DONE'
     - O OBJETO É SALVO NOVAMENTE, ASSIM ATUALIZADO SEU STATUS, TANTO PARA 'ERROR' OU 'DONE' DEPENDENDO DOS PASSOS ANTERIORES
     - CASO O SEGUNDO PASSO TENHA APRESENTADO ALGUM ERRO NA VERIFICAÇÃO IRÁ SER MANDADO UMA EXCEPTION DE ERRO 'BAD_REQUEST' MOSTRANDO EM QUAL PASSO ELE APRESENTOU O MESMO
     - CASO TODO O FLUXO TENHA PASSADO ATÉ AQUI, É RETORNADO PARA O USUÁRIO FINAL O RESULTADO DE SUA SUBMISSÃO
    
     VENHO PROCURANDO FORMAS DE COMO MELHORAR ISTO, COMO UTILIZAR UM SISTEMA DE NOTIFICAÇÃO COM O APACHE KAFKA ONDE ELE NÃO PRECISARIA TER UMA RESPOSTA DE IMEDIATO
     MAS TER UM OBSERVADOR E AGUARDAR CASO ALGUMA RESPOSTA FOR ENVIADA DE VOLTA.
  */
  async create(details: SubmissionDomain) {
    const challenge = await this.challengeService.findOne(details.challengeId);

    let submission = await this.repository.create(details);
    await this.repository.save(submission);

    let message = '';

    if (challenge != null) {
      if (isValidUrl(details.repositoryUrl)) {
        const result = await this.client
          .send('challenge.correction', details)
          .toPromise();

        submission.grade = result.grade;
        submission.status = result.status;
      } else message = 'Invalid repository URL.';
    } else message = 'No challenges found with this ID.';

    if (message !== '') submission.status = 'Error';

    submission = await this.repository.save(submission);

    if (submission.status === 'Error') {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return submission;
  }

  findAll(query: SubmissionQuery): Promise<SubmissionModel[]> {
    const builder = this.repository.createQueryBuilder();

    if (query.challenge) {
      builder.where(`"challengeId" = :name`, { name: query.challenge });
    }

    if (query.status) {
      builder.andWhere('status = :status', { status: query.status });
    }

    if (query.startDate && query.endDate) {
      builder.andWhere('date BETWEEN :start AND :end', {
        start: query.startDate,
        end: query.endDate,
      });
    }

    if (query.limit) {
      builder.limit(query.limit);
    }

    if (query.page) {
      builder.skip(query.page * query.limit);
    }

    return builder.getMany();
  }
}
