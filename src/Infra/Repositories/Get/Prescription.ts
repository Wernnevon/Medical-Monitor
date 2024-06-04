import { Prescription } from "../../../Domain/Entities";

export class PrescriptionRepository {
  constructor(private readonly OBJECT_STORE: IDBObjectStore) {}

  list(id: number): Promise<Prescription[]> {
    const request = this.OBJECT_STORE.getAll();
    return new Promise((resolve, reject) => {
      request.onerror = () => {
        reject(request.error);
      };
      request.onsuccess = () => {
        resolve(
          request.result.filter(
            (prescription: Prescription) => prescription.patientId === id
          )
        );
      };
    });
  }

  findById(id: number): Promise<Prescription> {
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
}
