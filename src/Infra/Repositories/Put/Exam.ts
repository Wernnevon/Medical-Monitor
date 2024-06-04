import Exam from "../../../Domain/Entities/Exams";

export class ExamRepository {
  constructor(private readonly OBJECT_STORE: IDBObjectStore) {}

  update(exam: Exam): Promise<void> {
    const request = this.OBJECT_STORE.add(exam);
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
