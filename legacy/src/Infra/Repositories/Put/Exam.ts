import Exam, { ExamStatus } from "../../../Domain/Entities/Exams";
import { getStringToday } from "../../../Presentation/Utils/dateUtils";
import {
  ConnectionType,
  getConnection,
} from "../../Frameworks/indexedConnection";
import { ExamRepository as GetExam } from "../Get";

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

  async changeStatus(id: number): Promise<void> {
    const exam: any = await GetExam.prototype.findById(id);
    exam.status =
      exam.status === ExamStatus.DONE
        ? ExamStatus.IN_PROGRESS
        : ExamStatus.DONE;

    if (exam.status === ExamStatus.IN_PROGRESS) delete exam.realizationDate;
    else exam.realizationDate = getStringToday();

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
}
