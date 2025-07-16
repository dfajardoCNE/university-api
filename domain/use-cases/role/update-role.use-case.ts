import { Injectable, Inject } from '@nestjs/common';
import { RoleRepository } from '../../repositories/role.repository';
import { Role } from '../../entities/role.entity';
import { UpdateRoleDto } from '../../../application/dto/role/update-role.dto';

@Injectable()
export class UpdateRoleUseCase {
  constructor(@Inject('RoleRepository') private readonly roleRepository: RoleRepository) {}

  async execute(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    return this.roleRepository.update(id, updateRoleDto);
  }
}