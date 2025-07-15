import { ApplicationDocument } from '../../entities/application-document.entity';
import { ApplicationDocumentRepository } from '../../repositories/application-document.repository';

export class GetDocumentsByApplicationUseCase {
  constructor(private applicationDocumentRepository: ApplicationDocumentRepository) {}

  async execute(applicationId: number): Promise<ApplicationDocument[]> {
    return this.applicationDocumentRepository.findByApplication(applicationId);
  }
}