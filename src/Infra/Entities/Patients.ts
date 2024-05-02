import { Adress, Health } from "./";

type Patient = {
  id?: number;
  anamnese: string;
  name: string;
  birthday: Date;
  fatherName: string;
  motherName: string;
  rg: string;
  cpf: string;
  gender: string;
  phone?: string;
  health: Health;
  adress: Adress;
};

export default Patient;
