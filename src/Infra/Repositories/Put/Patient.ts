import { Patient } from "../../../Domain/Entities";

export class PatientRepository {
  constructor(private readonly OBJECT_STORE: IDBObjectStore) {}

  update(patient: Patient): Promise<void> {
    const request = this.OBJECT_STORE.add(patient);
    return new Promise((resolve, reject) => {
      request.onerror = () => {
        reject(request.error);
      };

      request.onsuccess = () => {
        resolve();
      };
    });
  }
}
