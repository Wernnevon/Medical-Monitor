export interface Address {
  city: string;
  neighborhood: string;
  street: string;
  number: number;
  complement?: string;
}

export interface Exam {
  name: string;
  requisitionDate: Date;
  realizationDate?: Date;
  done: boolean;
  diagnosis?: string;
}
export interface Prescription {
  medicament: string;
  date: Date;
  administering: boolean;
}

export interface PersonalData {
  id?: string;
  name: string;
  birthday: Date;
  fatherName: string;
  motherName: string;
  rg: string;
  cpf: string;
  gender: string;
  phone?: string;
}

export interface Health {
  helthInsurance: string;
  allergy?: string;
  weight?: number;
  height?: number;
}

export default interface Patient {
  personalData: PersonalData;
  health: Health;
  adress: Address;
  exams: Exam[];
  medicament: Prescription[];
}
