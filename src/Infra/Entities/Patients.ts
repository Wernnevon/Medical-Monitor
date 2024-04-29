import { Adress, Exams, Health, PersonalData, Prescription } from "./";

type Patient = {
  id?: string;
  anamnese: string;
  personalData: PersonalData;
  health: Health;
  adress: Adress;
  exams: Exams[];
  medicament: Prescription[];
};

export default Patient;
