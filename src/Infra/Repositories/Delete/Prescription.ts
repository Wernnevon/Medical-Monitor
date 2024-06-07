import {
  ConnectionType,
  getConnection,
} from "../../Frameworks/indexedConnection";

export class PrescriptionRepository {
  async delete(id: number): Promise<void> {
    const db = await getConnection();
    const transaction = db.transaction(
      "prescriptions",
      ConnectionType.READWRITE
    );
    const objectStore = transaction.objectStore("prescriptions");
    const request = objectStore.delete(id);
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
