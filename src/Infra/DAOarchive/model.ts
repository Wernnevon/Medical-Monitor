interface Address {
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

export default interface Patient {
  id?: string;
  name: string;
  birthday: Date;
  helthInsurance: string;
  fatherName: string;
  motherName: string;
  rg: string;
  cpf: string;
  gender: string;
  phone?: string;
  allergy?: string;
  weight?: number;
  height?: number;
  adress: Address;
  exams: Exam[];
  medicament: Prescription[];
}
