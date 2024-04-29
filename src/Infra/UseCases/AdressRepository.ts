import { Adress } from "../Entities";
import { IAdressRepository } from "../Interfaces";

class AdressRepository implements IAdressRepository {
  listAll(): Promise<Adress[]> {
    throw new Error("Method not implemented.");
  }
  create(adress: Adress): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findOne(patientId: string): Promise<Adress> {
    throw new Error("Method not implemented.");
  }
  update(adress: Adress): Promise<void> {
    throw new Error("Method not implemented.");
  }
  remove(patientId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export default AdressRepository;
