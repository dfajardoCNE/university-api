import { Role } from '../entities/role.entity';

export interface RoleRepository {
  findAll(): Promise<Role[]>;
  findById(id: number): Promise<Role>;
  findByName(name: string): Promise<Role>;
}