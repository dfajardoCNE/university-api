import { UserRepository } from '../../repositories/user.repository';

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: number): Promise<void> {
    return this.userRepository.delete(id);
  }
}