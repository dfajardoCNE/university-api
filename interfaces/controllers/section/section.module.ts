import { Module } from '@nestjs/common';
import { SectionController } from './section.controller';
import { SectionRepositoryImpl } from '../../../infrastructure/database/repositories/section/section.repository.impl';
import { GetAllSectionsUseCase } from '../../../domain/use-cases/section/get-all-sections.use-case';
import { GetSectionByIdUseCase } from '../../../domain/use-cases/section/get-section-by-id.use-case';
import { GetSectionsByCourseUseCase } from '../../../domain/use-cases/section/get-sections-by-course.use-case';
import { GetSectionsByProfessorUseCase } from '../../../domain/use-cases/section/get-sections-by-professor.use-case';
import { CreateSectionUseCase } from '../../../domain/use-cases/section/create-section.use-case';
import { UpdateSectionUseCase } from '../../../domain/use-cases/section/update-section.use-case';
import { DeleteSectionUseCase } from '../../../domain/use-cases/section/delete-section.use-case';

@Module({
  controllers: [SectionController],
  providers: [
    {
      provide: 'SectionRepository',
      useClass: SectionRepositoryImpl,
    },
    {
      provide: GetAllSectionsUseCase,
      useFactory: (sectionRepository) => new GetAllSectionsUseCase(sectionRepository),
      inject: ['SectionRepository'],
    },
    {
      provide: GetSectionByIdUseCase,
      useFactory: (sectionRepository) => new GetSectionByIdUseCase(sectionRepository),
      inject: ['SectionRepository'],
    },
    {
      provide: GetSectionsByCourseUseCase,
      useFactory: (sectionRepository) => new GetSectionsByCourseUseCase(sectionRepository),
      inject: ['SectionRepository'],
    },
    {
      provide: GetSectionsByProfessorUseCase,
      useFactory: (sectionRepository) => new GetSectionsByProfessorUseCase(sectionRepository),
      inject: ['SectionRepository'],
    },
    {
      provide: CreateSectionUseCase,
      useFactory: (sectionRepository) => new CreateSectionUseCase(sectionRepository),
      inject: ['SectionRepository'],
    },
    {
      provide: UpdateSectionUseCase,
      useFactory: (sectionRepository) => new UpdateSectionUseCase(sectionRepository),
      inject: ['SectionRepository'],
    },
    {
      provide: DeleteSectionUseCase,
      useFactory: (sectionRepository) => new DeleteSectionUseCase(sectionRepository),
      inject: ['SectionRepository'],
    },
  ],
})
export class SectionModule {}