import { Post } from '../../entities/post.entity';
import { PostRepository } from '../../repositories/post.repository';

export class GetPostByIdUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(id: number): Promise<Post> {
    return this.postRepository.findById(id);
  }
}