import { Prescription } from "../../../Domain/Entities";
import {
  ConnectionType,
  getConnection,
} from "../../Frameworks/indexedConnection";

export class PrescriptionRepository {
  async list(id: number): Promise<Prescription[]> {
    const db = await getConnection();
    const transaction = db.transaction(
      "prescriptions",
      ConnectionType.READONLY
    );
    const objectStore = transaction.objectStore("prescriptions");
    const request = objectStore.getAll();
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

  async findById(id: number): Promise<Prescription> {
    const db = await getConnection();
    const transaction = db.transaction(
      "prescriptions",
      ConnectionType.READONLY
    );
    const objectStore = transaction.objectStore("prescriptions");
    const request = objectStore.get(id);
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
