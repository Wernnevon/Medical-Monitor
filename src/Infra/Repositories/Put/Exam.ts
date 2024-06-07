import Exam from "../../../Domain/Entities/Exams";
import {
  ConnectionType,
  getConnection,
} from "../../Frameworks/indexedConnection";

export class ExamRepository {
  async update(exam: Exam): Promise<void> {
    const db = await getConnection();
    const transaction = db.transaction("exams", ConnectionType.READWRITE);
    const objectStore = transaction.objectStore("exams");
    const request = objectStore.put(exam);
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
