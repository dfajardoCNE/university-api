import { Role } from '../entities/role.entity';

export interface RoleRepository {
  findAll(): Promise<Role[]>;
  findById(id: number): Promise<Role>;
  findByName(name: string): Promise<Role>;
  create(role: Partial<Role>): Promise<Role>;
  update(id: number, role: Partial<Role>): Promise<Role>;
  delete(id: number): Promise<void>;
}