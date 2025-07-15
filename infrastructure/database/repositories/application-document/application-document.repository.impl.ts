import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ApplicationDocument } from '../../../../domain/entities/application-document.entity';
import { ApplicationDocumentRepository } from '../../../../domain/repositories/application-document.repository';

@Injectable()
export class ApplicationDocumentRepositoryImpl implements ApplicationDocumentRepository {
  constructor(private prisma: PrismaService) {}

  async findByApplication(applicationId: number): Promise<ApplicationDocument[]> {
    return this.prisma.applicationDocument.findMany({
      where: { applicationId },
      include: {
        application: true,
      },
    });
  }

  async findById(id: number): Promise<ApplicationDocument> {
    return this.prisma.applicationDocument.findUnique({
      where: { id },
      include: {
        application: true,
      },
    });
  }

  async create(document: Partial<ApplicationDocument>): Promise<ApplicationDocument> {
    return this.prisma.applicationDocument.create({
      data: document,
      include: {
        application: true,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.applicationDocument.delete({
      where: { id },
    });
  }
}