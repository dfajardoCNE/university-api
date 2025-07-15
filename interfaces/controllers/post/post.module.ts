import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostRepositoryImpl } from '../../../infrastructure/database/repositories/post/post.repository.impl';
import { GetPostsByThreadUseCase } from '../../../domain/use-cases/post/get-posts-by-thread.use-case';
import { GetPostByIdUseCase } from '../../../domain/use-cases/post/get-post-by-id.use-case';
import { CreatePostUseCase } from '../../../domain/use-cases/post/create-post.use-case';
import { UpdatePostUseCase } from '../../../domain/use-cases/post/update-post.use-case';
import { DeletePostUseCase } from '../../../domain/use-cases/post/delete-post.use-case';

@Module({
  controllers: [PostController],
  providers: [
    {
      provide: 'PostRepository',
      useClass: PostRepositoryImpl,
    },
    {
      provide: GetPostsByThreadUseCase,
      useFactory: (repo) => new GetPostsByThreadUseCase(repo),
      inject: ['PostRepository'],
    },
    {
      provide: GetPostByIdUseCase,
      useFactory: (repo) => new GetPostByIdUseCase(repo),
      inject: ['PostRepository'],
    },
    {
      provide: CreatePostUseCase,
      useFactory: (repo) => new CreatePostUseCase(repo),
      inject: ['PostRepository'],
    },
    {
      provide: UpdatePostUseCase,
      useFactory: (repo) => new UpdatePostUseCase(repo),
      inject: ['PostRepository'],
    },
    {
      provide: DeletePostUseCase,
      useFactory: (repo) => new DeletePostUseCase(repo),
      inject: ['PostRepository'],
    },
  ],
})
export class PostModule {}