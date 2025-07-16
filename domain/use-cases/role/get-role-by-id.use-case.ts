import { Injectable, Inject } from '@nestjs/common';
import { RoleRepository } from '../../repositories/role.repository';
import { Role } from '../../entities/role.entity';

@Injectable()
export class GetRoleByIdUseCase {
  constructor(@Inject('RoleRepository') private readonly roleRepository: RoleRepository) {}

  async execute(id: number): Promise<Role> {
    return this.roleRepository.findById(id);
  }
}