import { Prescription } from "../Entities";
import { IPrescriptionRepository } from "../Interfaces";

class PrescriptionRepository implements IPrescriptionRepository {
  listAll(): Promise<Prescription[]> {
    throw new Error("Method not implemented.");
  }
  listByPatient(): Promise<Prescription[]> {
    throw new Error("Method not implemented.");
  }
  create(prescription: Prescription): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findOne(prescriptionId: string): Promise<Prescription> {
    throw new Error("Method not implemented.");
  }
  update(prescription: Prescription): Promise<void> {
    throw new Error("Method not implemented.");
  }
  remove(prescriptionId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export default PrescriptionRepository;
