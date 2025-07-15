import { CareerCampus } from '../entities/career-campus.entity';

export interface CareerCampusRepository {
  findAll(): Promise<CareerCampus[]>;
  findByCareer(careerId: number): Promise<CareerCampus[]>;
  findByCampus(campusId: number): Promise<CareerCampus[]>;
  create(careerCampus: CareerCampus): Promise<CareerCampus>;
  delete(careerId: number, campusId: number): Promise<void>;
}