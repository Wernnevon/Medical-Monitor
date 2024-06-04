import { Exams } from "../../../Domain/Entities";

export class ExamRepository {
  constructor(private readonly OBJECT_STORE: IDBObjectStore) {}

  list(id: number): Promise<Exams[]> {
    const request = this.OBJECT_STORE.getAll();
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

  findById(id: number): Promise<Exams> {
    const request = this.OBJECT_STORE.get(id);
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
