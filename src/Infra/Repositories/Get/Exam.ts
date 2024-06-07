import { Exams } from "../../../Domain/Entities";
import {
  ConnectionType,
  getConnection,
} from "../../Frameworks/indexedConnection";

export class ExamRepository {
  async list(id: number): Promise<Exams[]> {
    const db = await getConnection();
    const transaction = db.transaction("exams", ConnectionType.READONLY);
    const objectStore = transaction.objectStore("exams");
    const request = objectStore.getAll();
    return new Promise((resolve, reject) => {
      request.onerror = () => {
        reject(request.error);
      };
      request.onsuccess = () => {
        resolve(
          request.result.filter(
            (prescription: Exams) => prescription.patientId === id
          )
        );
      };
    });
  }

  async findById(id: number): Promise<Exams> {
    const db = await getConnection();
    const transaction = db.transaction("exams", ConnectionType.READONLY);
    const objectStore = transaction.objectStore("exams");
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
