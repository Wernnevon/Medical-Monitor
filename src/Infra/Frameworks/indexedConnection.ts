export enum ConnectionType {
  READONLY = "readonly",
  READWRITE = "readwrite",
}

function openDB(): IDBDatabase {
  const dbName = "mmdb",
    dbVersion = 1;
  const request = indexedDB.open(dbName, dbVersion);

  request.onerror = () => {
    throw new Error("Connection Failed");
  };

  request.onsuccess = () => {
    return request.result;
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
  return request.result;
}

export function getConnection(
  storeName: string,
  connectionType: ConnectionType
): IDBObjectStore {
  const db = openDB();
  const transaction = db.transaction(storeName, connectionType);
  return transaction.objectStore(storeName);
}
