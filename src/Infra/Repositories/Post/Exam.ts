import { Exams } from "../../../Domain/Entities";
import { List } from "../../../Domain/UseCases";
import { filterBy } from "../../Client/filters";
import {
  ConnectionType,
  getConnection,
} from "../../Frameworks/indexedConnection";

export class ExamRepository {
  async listPagination(
    pageNumber: number,
    pageSize: number,
    keywords?: string[],
    filters?: List.Filter[]
  ): Promise<{ totalRecords: number; records: Exams[] }> {
    const db = await getConnection();
    const transaction = db.transaction("exams", ConnectionType.READWRITE);
    const objectStore = transaction.objectStore("exams");
    const request = objectStore.getAll();
    return new Promise((resolve, reject) => {
      request.onerror = () => {
        reject(request.error);
      };

      request.onsuccess = () => {
        let filteredRecords: Exams[] = [...request.result];
        if (filters && filters.length) {
          filteredRecords = filteredRecords.filter((record) =>
            filters.every((filter) =>
              filterBy({
                key: filter.key,
                value: filter.value,
                record: record,
              })
            )
          );
        }
        if (keywords) {
          filteredRecords = filteredRecords.filter((record) =>
            keywords.every((keyword) =>
              filterBy({ key: "text", value: keyword, record })
            )
          );
        }
        const totalRecords = filteredRecords.length;
        const start = (pageNumber - 1) * pageSize;
        const end = start + pageSize;
        const records = filteredRecords.slice(start, end);
        resolve({ totalRecords, records });
      };
    });
  }

  async save(patient: Exams): Promise<void> {
    const db = await getConnection();
    const transaction = db.transaction("exams", ConnectionType.READWRITE);
    const objectStore = transaction.objectStore("exams");
    const request = objectStore.add(patient);
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
