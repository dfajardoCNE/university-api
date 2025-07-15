import { PostRepository } from '../../repositories/post.repository';

export class DeletePostUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(id: number): Promise<void> {
    return this.postRepository.delete(id);
  }
}