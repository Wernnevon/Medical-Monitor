import { Prescription } from "../../../Domain/Entities";

export class PrescriptionRepository {
  constructor(private readonly OBJECT_STORE: IDBObjectStore) {}

  update(prescription: Prescription): Promise<void> {
    const request = this.OBJECT_STORE.add(prescription);
    return new Promise((resolve, reject) => {
      request.onerror = () => {
        reject(request.error);
      };

      request.onsuccess = () => {
        resolve();
      };
    });
  }

  changeStatus() {}
}
