import { PersonalData } from "../Entities";
import { IPersonalDataRepository } from "../Interfaces";

class PersonalDataRepository implements IPersonalDataRepository {
  listAll(): Promise<PersonalData[]> {
    throw new Error("Method not implemented.");
  }
  create(patient: PersonalData): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findOne(id: string): Promise<PersonalData> {
    throw new Error("Method not implemented.");
  }
  update(patientId: string, patient: PersonalData): Promise<void> {
    throw new Error("Method not implemented.");
  }
  remove(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export default PersonalDataRepository;
