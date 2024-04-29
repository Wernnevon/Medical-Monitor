import { Patient } from "../Entities";
import { IPatientDataRepository } from "../Interfaces";

class PatientRepository implements IPatientDataRepository {
  listAll(): Promise<Patient[]> {
    throw new Error("Method not implemented.");
  }
  listPerPage(
    keywords: string[],
    filters: string[],
    page: number,
    totalPerPage: number
  ): Promise<Patient[]> {
    throw new Error("Method not implemented.");
  }
  create(patient: Patient): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findOne(id: string): Promise<Patient> {
    throw new Error("Method not implemented.");
  }
  update(patient: Patient): Promise<void> {
    throw new Error("Method not implemented.");
  }
  remove(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export default PatientRepository;
