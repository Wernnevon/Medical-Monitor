import { PersonalData } from "../Entities";

interface IPersonalDataRepository {
  listAll(): Promise<PersonalData[]>;
  create(patient: PersonalData): Promise<void>;
  findOne(id: string): Promise<PersonalData>;
  update(patientId: string, patient: PersonalData): Promise<void>;
  remove(id: string): Promise<void>;
}

export default IPersonalDataRepository;
