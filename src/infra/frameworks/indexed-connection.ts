export enum ConnectionType {
  READONLY = 'readonly',
  READWRITE = 'readwrite',
}

export const STORES = {
  patients: 'patients',
  exams: 'exams',
  prescriptions: 'prescriptions',
} as const;

const DB_NAME = 'mmdb';
const DB_VERSION = 1;

let dbPromise: Promise<IDBDatabase> | null = null;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      reject(request.error);
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onupgradeneeded = (event) => {
      const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;

      if (!db.objectStoreNames.contains(STORES.patients)) {
        db.createObjectStore(STORES.patients, {
          keyPath: 'id',
          autoIncrement: true,
        });
      }
      if (!db.objectStoreNames.contains(STORES.exams)) {
        db.createObjectStore(STORES.exams, {
          keyPath: 'id',
          autoIncrement: true,
        }).createIndex('patientId', 'patientId', { unique: false });
      }
      if (!db.objectStoreNames.contains(STORES.prescriptions)) {
        db.createObjectStore(STORES.prescriptions, {
          keyPath: 'id',
          autoIncrement: true,
        }).createIndex('patientId', 'patientId', { unique: false });
      }
    };
  });
}

/**
 * Conexão única e memoizada.
 *
 * O projeto React abria um `indexedDB.open` novo a cada operação de
 * repositório. Funciona, mas cada chamada custa um handshake e deixa
 * conexões penduradas; reusar a mesma promise é equivalente em
 * comportamento e evita esse desperdício.
 */
export async function getConnection(): Promise<IDBDatabase> {
  dbPromise ??= openDB().catch((error) => {
    dbPromise = null;
    throw error;
  });
  return dbPromise;
}

/**
 * Descarta a conexão memoizada.
 *
 * Existe para os testes, que trocam a implementação de `indexedDB` a cada
 * caso e precisam que a próxima chamada reabra o banco.
 */
export function resetConnection(): void {
  dbPromise = null;
}

/** Envolve um `IDBRequest` numa promise. Evita repetir onerror/onsuccess. */
export function fromRequest<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}
