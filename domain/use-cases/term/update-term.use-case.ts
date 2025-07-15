import { Term } from '../../entities/term.entity';
import { TermRepository } from '../../repositories/term.repository';

export class UpdateTermUseCase {
  constructor(private termRepository: TermRepository) {}

  async execute(id: number, term: Partial<Term>): Promise<Term> {
    return this.termRepository.update(id, term);
  }
}