import { Post } from '../../entities/post.entity';
import { PostRepository } from '../../repositories/post.repository';

export class UpdatePostUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(id: number, post: Partial<Post>): Promise<Post> {
    return this.postRepository.update(id, post);
  }
}