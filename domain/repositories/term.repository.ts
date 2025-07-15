import { Term } from '../entities/term.entity';

export interface TermRepository {
  findAll(): Promise<Term[]>;
  findById(id: number): Promise<Term>;
  findCurrent(): Promise<Term>;
  create(term: Partial<Term>): Promise<Term>;
  update(id: number, term: Partial<Term>): Promise<Term>;
  delete(id: number): Promise<void>;
}