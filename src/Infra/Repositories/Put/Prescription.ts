import { Prescription } from "../../../Domain/Entities";
import { PrescriptionStatus } from "../../../Domain/Entities/Prescription";

import {
  ConnectionType,
  getConnection,
} from "../../Frameworks/indexedConnection";
import { PrescriptionRepository as GetPrescription } from "../Get";

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

  async changeStatus(id: number): Promise<void> {
    const prescription: Prescription = await GetPrescription.prototype.findById(
      id
    );
    prescription.status =
      prescription.status === PrescriptionStatus.SUSPENDED
        ? PrescriptionStatus.ADMINISTERING
        : PrescriptionStatus.SUSPENDED;

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
}
