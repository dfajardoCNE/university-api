import { Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../../repositories/user.repository';
import { TokenService } from '../../../infrastructure/services/token.service';

@Injectable()
export class ResetPasswordUseCase {
  constructor(
    @Inject('UserRepository') private userRepository: UserRepository,
    private tokenService: TokenService,
  ) {}

  async execute(token: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    try {
      // Verificar validez del token
      const payload = await this.tokenService.verifyPasswordResetToken(token);
      
      if (!payload) {
        return { 
          success: false, 
          message: 'El enlace de restablecimiento es inválido o ha expirado.' 
        };
      }

      const userId = payload.userId;
      
      // Verificar que el token existe en la base de datos y no ha expirado
      const isTokenValid = await this.userRepository.verifyPasswordResetToken(userId, payload.tokenHash);
      
      if (!isTokenValid) {
        return { 
          success: false, 
          message: 'El enlace de restablecimiento es inválido o ha expirado.' 
        };
      }

      // Hash de la nueva contraseña
      const passwordHash = await bcrypt.hash(newPassword, 10);
      
      // Actualizar contraseña
      await this.userRepository.updatePassword(userId, passwordHash);
      
      // Invalidar el token usado
      await this.userRepository.invalidatePasswordResetToken(userId);
      
      return { 
        success: true, 
        message: 'Tu contraseña ha sido actualizada correctamente.' 
      };
    } catch (error) {
      return { 
        success: false, 
        message: 'Ha ocurrido un error al restablecer tu contraseña. Por favor, intenta nuevamente.' 
      };
    }
  }
}