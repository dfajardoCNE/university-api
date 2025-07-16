import { User } from '../../domain/entities/user.entity';
import { UserResponseDto } from '../dto/user/user-response.dto';

export class UserMapper {
  static toResponseDto(user: User): UserResponseDto {
    return {
      id: user.id,
      personId: user.personId,
      username: user.username,
      roleId: user.roleId,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin,
    } as any;
  }

  static toResponseDtoArray(users: User[]): UserResponseDto[] {
    return users.map(user => this.toResponseDto(user));
  }
}