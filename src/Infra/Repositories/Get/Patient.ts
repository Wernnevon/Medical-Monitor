import { Patient } from "../../../Domain/Entities";

export class PatientRpository {
  constructor(private readonly OBJECT_STORE: IDBObjectStore) {}

  list(): Promise<Patient[]> {
    const request = this.OBJECT_STORE.getAll();
    return new Promise((resolve, reject) => {
      request.onerror = () => {
        reject(request.error);
      };
      request.onsuccess = () => {
        resolve(request.result);
      };
    });
  }

  findById(id: number): Promise<Patient> {
    const request = this.OBJECT_STORE.get(id);
    return new Promise((resolve, reject) => {
      request.onerror = () => {
        reject(request.error);
      };
      request.onsuccess = () => {
        resolve(request.result);
      };
    });
  }

  listCities(): Promise<string[]> {
    const request = this.OBJECT_STORE.getAll();
    return new Promise((resolve, reject) => {
      request.onerror = () => {
        reject(request.error);
      };
      request.onsuccess = () => {
        resolve(request.result.map(({ adress: { city } }: Patient) => city));
      };
    });
  }

  listInsurances(): Promise<string[]> {
    const request = this.OBJECT_STORE.getAll();
    return new Promise((resolve, reject) => {
      request.onerror = () => {
        reject(request.error);
      };
      request.onsuccess = () => {
        resolve(
          request.result.map(
            ({ health: { healthInsurance: insurance } }: Patient) => insurance
          )
        );
      };
    });
  }
}
