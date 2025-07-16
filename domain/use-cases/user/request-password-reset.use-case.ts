import { Injectable, Inject } from '@nestjs/common';
import { UserRepository } from '../../repositories/user.repository';
import { NotificationService } from '../../../infrastructure/services/notification.service';
import { TokenService } from '../../../infrastructure/services/token.service';

@Injectable()
export class RequestPasswordResetUseCase {
    constructor(
        @Inject('UserRepository') private userRepository: UserRepository,
        private notificationService: NotificationService,
        private tokenService: TokenService,
    ) { }

    async execute(email: string): Promise<{ success: boolean; message: string }> {
        // Buscar usuario por email
        const user = await this.userRepository.findByEmail(email);

        // Si no existe el usuario, retornamos éxito para no revelar información
        if (!user) {
            return {
                success: true,
                message: 'Si el correo existe en nuestro sistema, recibirás un enlace para restablecer tu contraseña.'
            };
        }

        // Generar token de restablecimiento (expira en 1 hora)
        const resetToken = await this.tokenService.generatePasswordResetToken(user.id);

        // Guardar token en la base de datos (hash)
        await this.userRepository.savePasswordResetToken(user.id, resetToken.hash, resetToken.expiresAt);

        // Enviar email con enlace de restablecimiento
        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken.token}`;

        await this.notificationService.sendEmail({
            to: email,
            subject: 'Restablecimiento de contraseña',
            template: 'password-reset',
            context: {
                name: user.username,
                resetLink,
                expirationTime: '1 hora',
            },
        });

        return {
            success: true,
            message: 'Si el correo existe en nuestro sistema, recibirás un enlace para restablecer tu contraseña.'
        };
    }
}