import * as bcrypt from 'bcrypt';
import { User } from '../../entities/user.entity';
import { Person } from '../../entities/person.entity';
import { UserRepository } from '../../repositories/user.repository';
import { PersonRepository } from '../../repositories/person.repository';
import { RoleRepository } from '../../repositories/role.repository';

export class RegisterUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private personRepository: PersonRepository,
    private roleRepository: RoleRepository,
  ) {}

  async execute(userData: {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    roleName: string;
    dateOfBirth?: Date;
  }): Promise<User> {
    // Crear la persona
    const person = await this.personRepository.create({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      dateOfBirth: userData.dateOfBirth,
    });

    // Obtener el rol
    const role = await this.roleRepository.findByName(userData.roleName);
    if (!role) {
      throw new Error(`Role ${userData.roleName} not found`);
    }

    // Hash de la contraseña
    const passwordHash = await bcrypt.hash(userData.password, 10);

    // Crear el usuario
    return this.userRepository.create({
      personId: person.id,
      username: userData.username,
      passwordHash,
      roleId: role.id,
    });
  }
}