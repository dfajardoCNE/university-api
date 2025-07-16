import { Module } from '@nestjs/common';
import { PasswordResetController } from './password-reset.controller';
import { RequestPasswordResetUseCase } from '../../../domain/use-cases/user/request-password-reset.use-case';
import { ResetPasswordUseCase } from '../../../domain/use-cases/user/reset-password.use-case';
import { ServicesModule } from '../../../infrastructure/services/services.module';
import { RepositoriesModule } from '../../../infrastructure/database/repositories/repositories.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ServicesModule,
    RepositoriesModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [PasswordResetController],
  providers: [
    RequestPasswordResetUseCase,
    ResetPasswordUseCase,
  ],
})
export class AuthModule {}