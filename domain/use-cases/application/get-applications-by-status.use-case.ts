import { Application } from '../../entities/application.entity';
import { ApplicationRepository } from '../../repositories/application.repository';

export class GetApplicationsByStatusUseCase {
  constructor(private applicationRepository: ApplicationRepository) {}

  async execute(status: string): Promise<Application[]> {
    return this.applicationRepository.findByStatus(status);
  }
}