import { Patient } from "../Entities";

interface IPatientDataRepository {
  listAll(): Promise<Patient[]>;
  listPerPage(
    keywords: string[],
    filters: string[],
    page: number,
    totalPerPage: number
  ): Promise<Patient[]>;
  create(patient: Patient): Promise<void>;
  findOne(id: string): Promise<Patient>;
  update(patient: Patient): Promise<void>;
  remove(id: string): Promise<void>;
}

export default IPatientDataRepository;
