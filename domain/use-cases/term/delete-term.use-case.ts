import { TermRepository } from '../../repositories/term.repository';

export class DeleteTermUseCase {
  constructor(private termRepository: TermRepository) {}

  async execute(id: number): Promise<void> {
    return this.termRepository.delete(id);
  }
}