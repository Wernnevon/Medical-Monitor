import { Prescription } from "../../../Domain/Entities";
import {
  ConnectionType,
  getConnection,
} from "../../Frameworks/indexedConnection";

export class PrescriptionRepository {
  async update(prescription: Prescription): Promise<void> {
    const db = await getConnection();
    const transaction = db.transaction(
      "prescriptions",
      ConnectionType.READWRITE
    );
    const objectStore = transaction.objectStore("prescriptions");
    const request = objectStore.put(prescription);
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
