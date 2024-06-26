import { Patient } from "../../../Domain/Entities";
import {
  ConnectionType,
  getConnection,
} from "../../Frameworks/indexedConnection";

export class PatientRepository {
  async update(patient: Patient): Promise<void> {
    const db = await getConnection();
    const transaction = db.transaction("patients", ConnectionType.READWRITE);
    const objectStore = transaction.objectStore("patients");
    const request = objectStore.put(patient);
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
