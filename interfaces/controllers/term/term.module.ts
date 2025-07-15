import { Module } from '@nestjs/common';
import { TermController } from './term.controller';
import { TermRepositoryImpl } from '../../../infrastructure/database/repositories/term/term.repository.impl';
import { GetAllTermsUseCase } from '../../../domain/use-cases/term/get-all-terms.use-case';
import { GetTermByIdUseCase } from '../../../domain/use-cases/term/get-term-by-id.use-case';
import { GetCurrentTermUseCase } from '../../../domain/use-cases/term/get-current-term.use-case';
import { CreateTermUseCase } from '../../../domain/use-cases/term/create-term.use-case';
import { UpdateTermUseCase } from '../../../domain/use-cases/term/update-term.use-case';
import { DeleteTermUseCase } from '../../../domain/use-cases/term/delete-term.use-case';

@Module({
  controllers: [TermController],
  providers: [
    {
      provide: 'TermRepository',
      useClass: TermRepositoryImpl,
    },
    {
      provide: GetAllTermsUseCase,
      useFactory: (termRepository) => new GetAllTermsUseCase(termRepository),
      inject: ['TermRepository'],
    },
    {
      provide: GetTermByIdUseCase,
      useFactory: (termRepository) => new GetTermByIdUseCase(termRepository),
      inject: ['TermRepository'],
    },
    {
      provide: GetCurrentTermUseCase,
      useFactory: (termRepository) => new GetCurrentTermUseCase(termRepository),
      inject: ['TermRepository'],
    },
    {
      provide: CreateTermUseCase,
      useFactory: (termRepository) => new CreateTermUseCase(termRepository),
      inject: ['TermRepository'],
    },
    {
      provide: UpdateTermUseCase,
      useFactory: (termRepository) => new UpdateTermUseCase(termRepository),
      inject: ['TermRepository'],
    },
    {
      provide: DeleteTermUseCase,
      useFactory: (termRepository) => new DeleteTermUseCase(termRepository),
      inject: ['TermRepository'],
    },
  ],
})
export class TermModule {}