import { Injectable, Inject } from '@nestjs/common';
import { RoleRepository } from '../../repositories/role.repository';
import { Role } from '../../entities/role.entity';
import { CreateRoleDto } from '../../../application/dto/role/create-role.dto';

@Injectable()
export class CreateRoleUseCase {
  constructor(@Inject('RoleRepository') private readonly roleRepository: RoleRepository) {}

  async execute(createRoleDto: CreateRoleDto): Promise<Role> {
    const role: Partial<Role> = {
      name: createRoleDto.name,
      description: createRoleDto.description,
    };

    return this.roleRepository.create(role);
  }
}