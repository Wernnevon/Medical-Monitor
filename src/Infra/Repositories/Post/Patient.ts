import { Patient } from "../../../Domain/Entities";
import { ListPagination } from "../../../Domain/UseCases";
import { filterBy } from "../../Client/filters";
import {
  ConnectionType,
  getConnection,
} from "../../Frameworks/indexedConnection";

export class PatientRepository {
  async listPagination({
    page,
    pageSize,
    keywords,
    filters,
  }: ListPagination.Params): Promise<ListPagination.Response<Patient>> {
    const db = await getConnection();
    const transaction = db.transaction("patients", ConnectionType.READWRITE);
    const objectStore = transaction.objectStore("patients");
    const request = objectStore.getAll();
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
        const totalEntries = filteredRecords.length;
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const entries = filteredRecords.slice(start, end);
        resolve({ totalEntries, entries });
      };
    });
  }

  async save(patient: Patient): Promise<void> {
    const db = await getConnection();
    const transaction = db.transaction("patients", ConnectionType.READWRITE);
    const objectStore = transaction.objectStore("patients");
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
