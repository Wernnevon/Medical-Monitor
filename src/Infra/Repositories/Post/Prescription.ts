import { Prescription } from "../../../Domain/Entities";
import { ListPagination } from "../../../Domain/UseCases";
import { filterBy } from "../../Client/filters";
import {
  ConnectionType,
  getConnection,
} from "../../Frameworks/indexedConnection";

export class PrescriptionRepository {
  async listPagination({
    page,
    pageSize,
    filters,
    keywords,
  }: ListPagination.Params): Promise<ListPagination.Response<Prescription>> {
    const db = await getConnection();
    const transaction = db.transaction(
      "prescriptions",
      ConnectionType.READWRITE
    );
    const objectStore = transaction.objectStore("prescriptions");
    const request = objectStore.getAll();
    return new Promise((resolve, reject) => {
      request.onerror = () => {
        reject(request.error);
      };

      request.onsuccess = () => {
        let filteredRecords: Prescription[] = [...request.result];
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
        resolve({ entries, totalEntries });
      };
    });
  }

  async save(patient: Prescription): Promise<void> {
    const db = await getConnection();
    const transaction = db.transaction(
      "prescriptions",
      ConnectionType.READWRITE
    );
    const objectStore = transaction.objectStore("prescriptions");
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
