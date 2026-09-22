import type Adress from './adress';
import type Health from './health';
import type Syncable from './syncable';

type Patient = Syncable & {
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
