import { Term } from '../../entities/term.entity';
import { TermRepository } from '../../repositories/term.repository';

export class GetCurrentTermUseCase {
  constructor(private termRepository: TermRepository) {}

  async execute(): Promise<Term> {
    return this.termRepository.findCurrent();
  }
}