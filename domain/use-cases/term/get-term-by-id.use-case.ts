import { Term } from '../../entities/term.entity';
import { TermRepository } from '../../repositories/term.repository';

export class GetTermByIdUseCase {
  constructor(private termRepository: TermRepository) {}

  async execute(id: number): Promise<Term> {
    return this.termRepository.findById(id);
  }
}