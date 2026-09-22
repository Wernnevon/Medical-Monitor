import { IDBFactory } from 'fake-indexeddb';
import { beforeEach, describe, expect, it } from 'vitest';
import {
  INDEXES,
  STORES,
  getConnection,
  resetConnection,
} from './indexed-connection';

describe('schema do IndexedDB', () => {
  beforeEach(() => {
    globalThis.indexedDB = new IDBFactory();
    resetConnection();
  });

  it('cria as stores e os índices declarados', async () => {
    const db = await getConnection();

    expect([...db.objectStoreNames].sort()).toEqual(
      ['exams', 'meta', 'patients', 'prescriptions'].sort(),
    );

    const tx = db.transaction(
      [STORES.patients, STORES.exams, STORES.prescriptions],
      'readonly',
    );
    expect([...tx.objectStore(STORES.patients).indexNames].sort()).toEqual(
      Object.keys(INDEXES.patients).sort(),
    );
    expect([...tx.objectStore(STORES.exams).indexNames].sort()).toEqual(
      Object.keys(INDEXES.exams).sort(),
    );
  });

  it('indexa por caminho aninhado, e não pelo nome do índice', async () => {
    const db = await getConnection();
    const store = db.transaction(STORES.patients, 'readonly').objectStore(STORES.patients);

    expect(store.index('city').keyPath).toBe('adress.city');
    expect(store.index('healthInsurance').keyPath).toBe('health.healthInsurance');
  });

  it('usa chave fornecida pelo cliente, sem autoincremento', async () => {
    const db = await getConnection();
    const store = db.transaction(STORES.patients, 'readonly').objectStore(STORES.patients);

    expect(store.keyPath).toBe('id');
    expect(store.autoIncrement).toBe(false);
  });

  /**
   * O ponto da escada: um banco que já existe na v1 precisa chegar ao schema
   * novo. O projeto React tinha um único bloco `if (!contains) create`, que
   * não fazia nada num banco existente — bastava ter aberto o app uma vez
   * para o schema congelar.
   */
  it('migra um banco que já existia na versão 1', async () => {
    await new Promise<void>((resolve, reject) => {
      const req = indexedDB.open('mmdb', 1);
      req.onerror = () => reject(req.error);
      req.onupgradeneeded = () => {
        const db = req.result;
        db.createObjectStore('patients', { keyPath: 'id', autoIncrement: true });
        db.createObjectStore('exams', { keyPath: 'id', autoIncrement: true })
          .createIndex('patientId', 'patientId', { unique: false });
        db.createObjectStore('prescriptions', { keyPath: 'id', autoIncrement: true })
          .createIndex('patientId', 'patientId', { unique: false });
      };
      req.onsuccess = () => {
        req.result.close();
        resolve();
      };
    });

    resetConnection();
    const db = await getConnection();

    expect(db.version).toBe(2);
    expect(db.objectStoreNames.contains(STORES.meta)).toBe(true);

    const store = db.transaction(STORES.patients, 'readonly').objectStore(STORES.patients);
    expect(store.autoIncrement).toBe(false);
    expect([...store.indexNames].sort()).toEqual(Object.keys(INDEXES.patients).sort());
  });
});
