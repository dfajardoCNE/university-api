import { Application } from '../entities/application.entity';

export interface ApplicationRepository {
  findAll(): Promise<Application[]>;
  findById(id: number): Promise<Application>;
  findByPerson(personId: number): Promise<Application[]>;
  findByCareer(careerId: number): Promise<Application[]>;
  findByCampus(campusId: number): Promise<Application[]>;
  findByStatus(status: string): Promise<Application[]>;
  create(application: Partial<Application>): Promise<Application>;
  update(id: number, application: Partial<Application>): Promise<Application>;
  delete(id: number): Promise<void>;
}