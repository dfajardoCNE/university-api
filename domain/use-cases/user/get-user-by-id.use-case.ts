import { User } from '../../entities/user.entity';
import { UserRepository } from '../../repositories/user.repository';

export class GetUserByIdUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: number): Promise<User> {
    return this.userRepository.findById(id);
  }
}