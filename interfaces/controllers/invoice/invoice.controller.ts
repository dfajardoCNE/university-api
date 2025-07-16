import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { CreateInvoiceUseCase } from '../../../domain/use-cases/invoice/create-invoice.use-case';
import { VerifyPaymentStatusUseCase } from '../../../domain/use-cases/invoice/verify-payment-status.use-case';
import { JwtAuthGuard } from '../../../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { Roles } from '../../../shared/decorators/roles.decorator';

class CreateInvoiceDto {
  studentId: number;
  amount: number;
  concept: string;
  dueDate: Date;
  termId?: number;
  description?: string;
}

@Controller('invoices')
@UseGuards(JwtAuthGuard, RolesGuard)
export class InvoiceController {
  constructor(
    private readonly createInvoiceUseCase: CreateInvoiceUseCase,
    private readonly verifyPaymentStatusUseCase: VerifyPaymentStatusUseCase,
  ) {}

  @Post()
  @Roles('admin', 'finance')
  async create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.createInvoiceUseCase.execute(createInvoiceDto);
  }

  @Get('student/:id')
  @Roles('admin', 'finance', 'student')
  async getByStudent(@Param('id') id: string) {
    // Aquí se implementaría el caso de uso para obtener facturas por estudiante
    return { message: 'Not implemented yet' };
  }

  @Get('student/:id/payment-status')
  @Roles('admin', 'finance', 'student')
  async getPaymentStatus(@Param('id') id: string) {
    return this.verifyPaymentStatusUseCase.execute(+id);
  }

  @Get(':id')
  @Roles('admin', 'finance', 'student')
  async getById(@Param('id') id: string) {
    // Aquí se implementaría el caso de uso para obtener una factura por ID
    return { message: 'Not implemented yet' };
  }
}