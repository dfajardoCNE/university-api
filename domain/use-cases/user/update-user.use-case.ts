import * as bcrypt from 'bcrypt';
import { User } from '../../entities/user.entity';
import { UserRepository } from '../../repositories/user.repository';
import { PersonRepository } from '../../repositories/person.repository';

export class UpdateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private personRepository: PersonRepository,
  ) {}

  async execute(
    id: number,
    userData: {
      firstName?: string;
      lastName?: string;
      email?: string;
      username?: string;
      password?: string;
      dateOfBirth?: Date;
      profilePhotoPath?: string;
    },
  ): Promise<User> {
    // Obtener el usuario actual
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    // Actualizar datos de la persona
    if (userData.firstName || userData.lastName || userData.email || userData.dateOfBirth || userData.profilePhotoPath) {
      await this.personRepository.update(user.personId, {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        dateOfBirth: userData.dateOfBirth,
        profilePhotoPath: userData.profilePhotoPath,
      });
    }

    // Actualizar datos del usuario
    const updateData: Partial<User> = {};
    
    if (userData.username) {
      updateData.username = userData.username;
    }
    
    if (userData.password) {
      updateData.passwordHash = await bcrypt.hash(userData.password, 10);
    }
    
    if (Object.keys(updateData).length > 0) {
      return this.userRepository.update(id, updateData);
    }
    
    return user;
  }
}