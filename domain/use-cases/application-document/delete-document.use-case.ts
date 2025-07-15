import { ApplicationDocumentRepository } from '../../repositories/application-document.repository';

export class DeleteDocumentUseCase {
  constructor(private applicationDocumentRepository: ApplicationDocumentRepository) {}

  async execute(id: number): Promise<void> {
    return this.applicationDocumentRepository.delete(id);
  }
}