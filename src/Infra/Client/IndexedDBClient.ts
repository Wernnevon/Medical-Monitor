/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-useless-computed-key */
import { List } from "../../Domain/UseCases";
import { ClientReq, ClientRes, Client } from "./Protocols/resquest";
import { filterBy } from "./filters";

type DBConfig = {
  dbName: string;
  dbVersion: number;
  storeName: string;
};

/** Nececisade de refactor:
 * O client tem a responsabilidade de acessar quem fornece os dados
 * por isso esse módulu deve ser isolado para preservar o principio
 * de responsabilidade única de uma classe
 *
 * Então o módulo que fornece o acesso ao banco deve ser isolado e
 * fornecer apoenas um objeto capaz de devolver os dados, nesse caso
 * o objectStore, de acordo com o storeName, e em outro módulo deve
 * funcionar a execução das requests como rotas de uma api.
 *
 * De modo simples a solução é o uso de strategy patterns encadeados
 *
 */

class IndexedDBClient implements Client {
  constructor(private readonly dbConfig: DBConfig) {}

  request(params: ClientReq): Promise<ClientRes<any>> {
    const { data, method } = params;

    const requestManager = {
      ["post"]: () => this.addRecord(data),
      ["get"]: () => {
        if (data) {
          if (data.page)
            return this.getRecordsWithPagination(
              data.page,
              data.pageSize,
              data.keywords,
              data.filters
            );
          else if (data.id) return this.getRecord(data);
        }
        return this.getAllRecords();
      },
      ["put"]: () => this.updateRecord(data),
      ["delete"]: () => this.deleteRecord(data),
    };
    return Promise.resolve({ data: requestManager[method]() });
  }

  private openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(
        this.dbConfig.dbName,
        this.dbConfig.dbVersion
      );

      request.onerror = () => {
        reject(request.error);
      };

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onupgradeneeded = (event: any) => {
        const db: IDBDatabase = event.target.result;

        if (!db.objectStoreNames.contains("patients")) {
          db.createObjectStore("patients", {
            keyPath: "id",
            autoIncrement: true,
          });
        }
        if (!db.objectStoreNames.contains("exams")) {
          db.createObjectStore("exams", {
            keyPath: "id",
            autoIncrement: true,
          });
        }
        if (!db.objectStoreNames.contains("prescriptions")) {
          db.createObjectStore("prescriptions", {
            keyPath: "id",
            autoIncrement: true,
          });
        }
      };
    });
  }

  private async addRecord(record: any): Promise<any> {
    const db = await this.openDB();
    const transaction = db.transaction(this.dbConfig.storeName, "readwrite");
    const objectStore = transaction.objectStore(this.dbConfig.storeName);
    objectStore.add(record);
    return null;
  }

  private async updateRecord(record: any): Promise<any> {
    const db = await this.openDB();
    const transaction = db.transaction(this.dbConfig.storeName, "readwrite");
    const objectStore = transaction.objectStore(this.dbConfig.storeName);
    objectStore.put(record);
    return null;
  }

  private async deleteRecord(id: string): Promise<any> {
    const db = await this.openDB();
    const transaction = db.transaction(this.dbConfig.storeName, "readwrite");
    const objectStore = transaction.objectStore(this.dbConfig.storeName);
    objectStore.delete(id);
    return null;
  }

  private async getRecord(id: string): Promise<any> {
    const db = await this.openDB();
    const transaction = db.transaction(this.dbConfig.storeName, "readonly");
    const objectStore = transaction.objectStore(this.dbConfig.storeName);
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

  private async getAllRecords(): Promise<any> {
    const db = await this.openDB();
    const transaction = db.transaction(this.dbConfig.storeName, "readonly");
    const objectStore = transaction.objectStore(this.dbConfig.storeName);
    const request = objectStore.getAll();
    return new Promise((resolve, reject) => {
      request.onerror = () => {
        reject(request.error);
      };
      request.onsuccess = () => {
        resolve(request.result);
      };
    });
  }

  async getRecordsWithPagination(
    pageNumber: number,
    pageSize: number,
    keywords?: string[],
    filters?: List.Filter[]
  ): Promise<{ totalRecords: number; records: any[] }> {
    const db = await this.openDB();
    const transaction = db.transaction(this.dbConfig.storeName, "readonly");
    const objectStore = transaction.objectStore(this.dbConfig.storeName);
    const request = objectStore.getAll();

    return new Promise((resolve, reject) => {
      request.onerror = () => {
        reject(request.error);
      };

      request.onsuccess = () => {
        let filteredRecords: any[] = [...request.result];
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
              filterBy({ key: "patient", value: keyword, record })
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
}

export default IndexedDBClient;
