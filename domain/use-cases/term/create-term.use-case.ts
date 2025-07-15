import { Term } from '../../entities/term.entity';
import { TermRepository } from '../../repositories/term.repository';

export class CreateTermUseCase {
  constructor(private termRepository: TermRepository) {}

  async execute(term: Partial<Term>): Promise<Term> {
    return this.termRepository.create(term);
  }
}