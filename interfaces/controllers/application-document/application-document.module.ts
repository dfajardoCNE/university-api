import { Module } from '@nestjs/common';
import { ApplicationDocumentController } from './application-document.controller';
import { ApplicationDocumentRepositoryImpl } from '../../../infrastructure/database/repositories/application-document/application-document.repository.impl';
import { GetDocumentsByApplicationUseCase } from '../../../domain/use-cases/application-document/get-documents-by-application.use-case';
import { GetDocumentByIdUseCase } from '../../../domain/use-cases/application-document/get-document-by-id.use-case';
import { CreateDocumentUseCase } from '../../../domain/use-cases/application-document/create-document.use-case';
import { DeleteDocumentUseCase } from '../../../domain/use-cases/application-document/delete-document.use-case';

@Module({
  controllers: [ApplicationDocumentController],
  providers: [
    {
      provide: 'ApplicationDocumentRepository',
      useClass: ApplicationDocumentRepositoryImpl,
    },
    {
      provide: GetDocumentsByApplicationUseCase,
      useFactory: (repo) => new GetDocumentsByApplicationUseCase(repo),
      inject: ['ApplicationDocumentRepository'],
    },
    {
      provide: GetDocumentByIdUseCase,
      useFactory: (repo) => new GetDocumentByIdUseCase(repo),
      inject: ['ApplicationDocumentRepository'],
    },
    {
      provide: CreateDocumentUseCase,
      useFactory: (repo) => new CreateDocumentUseCase(repo),
      inject: ['ApplicationDocumentRepository'],
    },
    {
      provide: DeleteDocumentUseCase,
      useFactory: (repo) => new DeleteDocumentUseCase(repo),
      inject: ['ApplicationDocumentRepository'],
    },
  ],
})
export class ApplicationDocumentModule {}