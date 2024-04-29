import { Prescription } from "../Entities";

interface IPrescriptionRepository {
  listAll(): Promise<Prescription[]>;
  listByPatient(): Promise<Prescription[]>;
  create(exams: Prescription): Promise<void>;
  findOne(examsId: string): Promise<Prescription>;
  update(exams: Prescription): Promise<void>;
  remove(examsId: string): Promise<void>;
}

export default IPrescriptionRepository;
