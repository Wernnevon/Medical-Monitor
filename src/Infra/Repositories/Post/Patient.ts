import { Patient } from "../../../Domain/Entities";
import { List } from "../../../Domain/UseCases";
import { filterBy } from "../../Client/filters";

export class PatientRepository {
  constructor(private readonly OBJECT_STORE: IDBObjectStore) {}

  listPagination(
    pageNumber: number,
    pageSize: number,
    keywords?: string[],
    filters?: List.Filter[]
  ): Promise<{ totalRecords: number; records: Patient[] }> {
    const request = this.OBJECT_STORE.getAll();
    return new Promise((resolve, reject) => {
      request.onerror = () => {
        reject(request.error);
      };

      request.onsuccess = () => {
        let filteredRecords: Patient[] = [...request.result];
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

  save(patient: Patient): Promise<void> {
    const request = this.OBJECT_STORE.add(patient);
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
