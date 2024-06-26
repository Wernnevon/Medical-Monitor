export enum ConnectionType {
  READONLY = "readonly",
  READWRITE = "readwrite",
}

function openDB(): Promise<IDBDatabase> {
  const dbName = "mmdb",
    dbVersion = 1;
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, dbVersion);

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

export async function getConnection(): Promise<IDBDatabase> {
  return await openDB();
}
