import { Injectable, Inject } from '@nestjs/common';
import { RoleRepository } from '../../repositories/role.repository';

@Injectable()
export class DeleteRoleUseCase {
  constructor(@Inject('RoleRepository') private readonly roleRepository: RoleRepository) {}

  async execute(id: number): Promise<void> {
    return this.roleRepository.delete(id);
  }
}