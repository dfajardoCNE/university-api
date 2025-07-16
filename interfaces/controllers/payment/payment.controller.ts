import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { CreatePaymentUseCase } from '../../../domain/use-cases/payment/create-payment.use-case';
import { JwtAuthGuard } from '../../../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { Roles } from '../../../shared/decorators/roles.decorator';

class CreatePaymentDto {
  studentId: number;
  amount: number;
  concept: string;
  paymentMethod: string;
  referenceNumber?: string;
  termId?: number;
  description?: string;
}

@Controller('payments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PaymentController {
  constructor(
    private readonly createPaymentUseCase: CreatePaymentUseCase,
  ) {}

  @Post()
  @Roles('admin', 'finance')
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.createPaymentUseCase.execute(createPaymentDto);
  }

  @Get('student/:id')
  @Roles('admin', 'finance', 'student')
  async getByStudent(@Param('id') id: string) {
    // Aquí se implementaría el caso de uso para obtener pagos por estudiante
    return { message: 'Not implemented yet' };
  }

  @Get(':id')
  @Roles('admin', 'finance')
  async getById(@Param('id') id: string) {
    // Aquí se implementaría el caso de uso para obtener un pago por ID
    return { message: 'Not implemented yet' };
  }
}