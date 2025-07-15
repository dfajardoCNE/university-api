export class Report {
  id: number;
  threadId?: number;
  postId?: number;
  reportedBy: number;
  reason: string;
  status: string;
  createdAt: Date;
  resolvedAt?: Date;
}