import { Post } from '../../entities/post.entity';
import { PostRepository } from '../../repositories/post.repository';

export class GetPostsByThreadUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(threadId: number): Promise<Post[]> {
    return this.postRepository.findByThread(threadId);
  }
}