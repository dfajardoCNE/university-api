import { ApplicationDocument } from '../../entities/application-document.entity';
import { ApplicationDocumentRepository } from '../../repositories/application-document.repository';

export class GetDocumentByIdUseCase {
  constructor(private applicationDocumentRepository: ApplicationDocumentRepository) {}

  async execute(id: number): Promise<ApplicationDocument> {
    return this.applicationDocumentRepository.findById(id);
  }
}