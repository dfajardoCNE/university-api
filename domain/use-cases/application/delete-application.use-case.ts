import { ApplicationRepository } from '../../repositories/application.repository';

export class DeleteApplicationUseCase {
  constructor(private applicationRepository: ApplicationRepository) {}

  async execute(id: number): Promise<void> {
    return this.applicationRepository.delete(id);
  }
}