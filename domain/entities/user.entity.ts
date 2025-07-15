export class User {
  id: number;
  personId: number;
  username: string;
  passwordHash: string;
  roleId: number;
  createdAt: Date;
  lastLogin?: Date;
}