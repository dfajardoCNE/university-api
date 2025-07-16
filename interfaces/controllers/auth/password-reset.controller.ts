import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { RequestPasswordResetUseCase } from '../../../domain/use-cases/user/request-password-reset.use-case';
import { ResetPasswordUseCase } from '../../../domain/use-cases/user/reset-password.use-case';

class RequestPasswordResetDto {
  email: string;
}

class ResetPasswordDto {
  token: string;
  newPassword: string;
}

@Controller('auth/password-reset')
export class PasswordResetController {
  constructor(
    private readonly requestPasswordResetUseCase: RequestPasswordResetUseCase,
    private readonly resetPasswordUseCase: ResetPasswordUseCase,
  ) {}

  @Post('request')
  @HttpCode(HttpStatus.OK)
  async requestReset(@Body() requestDto: RequestPasswordResetDto) {
    return this.requestPasswordResetUseCase.execute(requestDto.email);
  }

  @Post('reset')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() resetDto: ResetPasswordDto) {
    return this.resetPasswordUseCase.execute(resetDto.token, resetDto.newPassword);
  }
}