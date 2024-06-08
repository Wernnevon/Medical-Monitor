import {
  ConnectionType,
  getConnection,
} from "../../Frameworks/indexedConnection";

export class ExamRepository {
  async delete(id: number[]): Promise<void> {
    const db = await getConnection();
    const transaction = db.transaction("exams", ConnectionType.READWRITE);
    const objectStore = transaction.objectStore("exams");
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
