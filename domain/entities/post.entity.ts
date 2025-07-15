export class Post {
  id: number;
  threadId: number;
  userId: number;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}