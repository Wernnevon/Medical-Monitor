import { Adress } from "../Entities";

interface IAdressRepository {
  listAll(): Promise<Adress[]>;
  create(adress: Adress): Promise<void>;
  findOne(patientId: string): Promise<Adress>;
  update(adress: Adress): Promise<void>;
  remove(patientId: string): Promise<void>;
}

export default IAdressRepository;
