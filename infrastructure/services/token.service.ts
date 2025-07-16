import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  async generatePasswordResetToken(userId: number): Promise<{ token: string; hash: string; expiresAt: Date }> {
    // Generar token aleatorio
    const resetToken = crypto.randomBytes(32).toString('hex');
    
    // Crear hash del token para almacenar en la base de datos
    const hash = crypto.createHash('sha256').update(resetToken).digest('hex');
    
    // Fecha de expiración (1 hora)
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);
    
    // Crear JWT con el token y userId
    const token = this.jwtService.sign(
      { 
        userId, 
        tokenHash: hash 
      },
      { 
        expiresIn: '1h' 
      }
    );
    
    return {
      token,
      hash,
      expiresAt,
    };
  }

  async verifyPasswordResetToken(token: string): Promise<{ userId: number; tokenHash: string } | null> {
    try {
      const payload = this.jwtService.verify(token);
      return {
        userId: payload.userId,
        tokenHash: payload.tokenHash,
      };
    } catch (error) {
      return null;
    }
  }
}