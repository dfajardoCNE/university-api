import { Injectable, Inject } from '@nestjs/common';
import { RoleRepository } from '../../repositories/role.repository';
import { Role } from '../../entities/role.entity';

@Injectable()
export class GetAllRolesUseCase {
  constructor(@Inject('RoleRepository') private readonly roleRepository: RoleRepository) {}

  async execute(): Promise<Role[]> {
    return this.roleRepository.findAll();
  }
}