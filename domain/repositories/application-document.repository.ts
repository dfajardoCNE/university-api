import { ApplicationDocument } from '../entities/application-document.entity';

export interface ApplicationDocumentRepository {
  findByApplication(applicationId: number): Promise<ApplicationDocument[]>;
  findById(id: number): Promise<ApplicationDocument>;
  create(document: Partial<ApplicationDocument>): Promise<ApplicationDocument>;
  delete(id: number): Promise<void>;
}