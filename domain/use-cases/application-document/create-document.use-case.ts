import { ApplicationDocument } from '../../entities/application-document.entity';
import { ApplicationDocumentRepository } from '../../repositories/application-document.repository';

export class CreateDocumentUseCase {
  constructor(private applicationDocumentRepository: ApplicationDocumentRepository) {}

  async execute(document: Partial<ApplicationDocument>): Promise<ApplicationDocument> {
    return this.applicationDocumentRepository.create(document);
  }
}