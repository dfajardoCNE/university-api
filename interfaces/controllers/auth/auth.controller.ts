import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from '../../../infrastructure/auth/auth.service';
import { LocalAuthGuard } from '../../../infrastructure/auth/guards/local-auth.guard';
import { LoginDto } from '../../../application/dto/auth/login.dto';
import { AuthResponseDto } from '../../../application/dto/auth/auth-response.dto';

@ApiTags('autenticación')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({ status: 200, description: 'Login exitoso', type: AuthResponseDto })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(loginDto);
  }

  @Post('logout')
  @ApiOperation({ summary: 'Cerrar sesión' })
  @ApiResponse({ status: 200, description: 'Logout exitoso' })
  async logout(): Promise<{ message: string }> {
    return { message: 'Sesión cerrada exitosamente' };
  }
}
