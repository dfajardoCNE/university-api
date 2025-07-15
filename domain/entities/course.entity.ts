export class Course {
  id: number;
  careerId: number;
  code: string;
  name: string;
  credits: number;
  createdAt: Date;
  updatedAt?: Date;
}