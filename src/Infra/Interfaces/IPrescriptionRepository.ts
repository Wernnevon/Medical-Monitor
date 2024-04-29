import { Prescription } from "../Entities";

interface IPrescriptionRepository {
  listAll(): Promise<Prescription[]>;
  listByPatient(): Promise<Prescription[]>;
  create(prescription: Prescription): Promise<void>;
  findOne(prescriptionId: string): Promise<Prescription>;
  update(prescription: Prescription): Promise<void>;
  remove(prescriptionId: string): Promise<void>;
}

export default IPrescriptionRepository;
