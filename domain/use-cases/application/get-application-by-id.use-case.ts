import { Application } from '../../entities/application.entity';
import { ApplicationRepository } from '../../repositories/application.repository';

export class GetApplicationByIdUseCase {
  constructor(private applicationRepository: ApplicationRepository) {}

  async execute(id: number): Promise<Application> {
    return this.applicationRepository.findById(id);
  }
}