export enum ConnectionType {
  READONLY = 'readonly',
  READWRITE = 'readwrite',
}

export const STORES = {
  patients: 'patients',
  exams: 'exams',
  prescriptions: 'prescriptions',
  meta: 'meta',
} as const;

/** Índices disponíveis, por store. Centralizados para não haver string solta. */
export const INDEXES = {
  patients: {
    name: 'name',
    city: 'adress.city',
    healthInsurance: 'health.healthInsurance',
    updatedAt: 'updatedAt',
  },
  exams: {
    patientId: 'patientId',
    status: 'status',
    updatedAt: 'updatedAt',
  },
  prescriptions: {
    patientId: 'patientId',
    status: 'status',
    updatedAt: 'updatedAt',
  },
} as const;

const DB_NAME = 'mmdb';
const DB_VERSION = 2;

let dbPromise: Promise<IDBDatabase> | null = null;

/**
 * Migrações em escada.
 *
 * Cada passo leva o banco de uma versão à seguinte e roda em sequência a
 * partir da versão que o usuário tem. O projeto React tinha um único bloco
 * de `if (!contains) create`, que só sabia criar do zero: um banco já
 * existente nunca ganhava índice novo, porque os stores já existiam e o
 * bloco não fazia nada. Bastava alguém já ter aberto o app uma vez para o
 * schema congelar.
 *
 * Um passo só pode usar a API síncrona do IndexedDB — a transação de upgrade
 * é abortada se o controle voltar ao loop de eventos.
 */
const MIGRATIONS: Record<number, (db: IDBDatabase, tx: IDBTransaction) => void> = {
  // v1: schema original do projeto React, com chave autoincremental.
  1: (db) => {
    db.createObjectStore(STORES.patients, { keyPath: 'id', autoIncrement: true });
    db.createObjectStore(STORES.exams, { keyPath: 'id', autoIncrement: true })
      .createIndex('patientId', 'patientId', { unique: false });
    db.createObjectStore(STORES.prescriptions, { keyPath: 'id', autoIncrement: true })
      .createIndex('patientId', 'patientId', { unique: false });
  },

  // v2: chave passa a ser UUID gerado no cliente, entram os índices de
  // consulta e o store de metadados.
  2: (db) => {
    // A chave muda de inteiro autoincremental para UUID, e `keyPath` é
    // imutável depois que o store existe — então os três são recriados.
    // Não há migração de dados porque não existe base em produção; quando
    // houver, o caminho será exportar antes e reimportar depois.
    for (const nome of [STORES.patients, STORES.exams, STORES.prescriptions]) {
      if (db.objectStoreNames.contains(nome)) db.deleteObjectStore(nome);
    }

    const patients = db.createObjectStore(STORES.patients, { keyPath: 'id' });
    for (const [nome, caminho] of Object.entries(INDEXES.patients)) {
      patients.createIndex(nome, caminho, { unique: false });
    }

    for (const nome of [STORES.exams, STORES.prescriptions] as const) {
      const store = db.createObjectStore(nome, { keyPath: 'id' });
      for (const [indice, caminho] of Object.entries(INDEXES[nome])) {
        store.createIndex(indice, caminho, { unique: false });
      }
    }

    // Guarda estado que não pertence a nenhuma entidade: data do último
    // backup, identificador deste dispositivo, marcadores de sync.
    if (!db.objectStoreNames.contains(STORES.meta)) {
      db.createObjectStore(STORES.meta, { keyPath: 'key' });
    }
  },
};

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    // Dispara quando outra aba segura a versão antiga. Sem isto o upgrade
    // fica pendurado em silêncio até a outra aba fechar.
    request.onblocked = () =>
      reject(
        new Error(
          'O banco está aberto em outra aba. Feche as demais abas do Medical Monitor e recarregue.',
        ),
      );

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const tx = (event.target as IDBOpenDBRequest).transaction!;
      const de = event.oldVersion;

      for (let versao = de + 1; versao <= DB_VERSION; versao++) {
        MIGRATIONS[versao]?.(db, tx);
      }
    };
  });
}

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
