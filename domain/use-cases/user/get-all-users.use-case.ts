import { User } from '../../entities/user.entity';
import { UserRepository } from '../../repositories/user.repository';

export class GetAllUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}