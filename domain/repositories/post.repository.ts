import { Post } from '../entities/post.entity';

export interface PostRepository {
  findAll(): Promise<Post[]>;
  findById(id: number): Promise<Post>;
  findByThread(threadId: number): Promise<Post[]>;
  findByUser(userId: number): Promise<Post[]>;
  create(post: Partial<Post>): Promise<Post>;
  update(id: number, post: Partial<Post>): Promise<Post>;
  delete(id: number): Promise<void>;
}