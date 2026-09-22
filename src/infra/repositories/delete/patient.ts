import { Service } from '@angular/core';
import {
  ConnectionType,
  STORES,
  fromRequest,
  getConnection,
} from '@infra/frameworks/indexed-connection';

@Service()
export class PatientDeleteRepository {
  /**
   * Remove pacientes e, em cascata, seus exames e prescrições.
   *
   * Tudo corre numa única transação sobre as três stores: se qualquer passo
   * falhar, o IndexedDB aborta o conjunto e nenhum registro órfão sobra.
   */
  async delete(ids: string[]): Promise<void> {
    const db = await getConnection();
    const transaction = db.transaction(
      [STORES.patients, STORES.exams, STORES.prescriptions],
      ConnectionType.READWRITE,
    );

    const patientStore = transaction.objectStore(STORES.patients);
    const examStore = transaction.objectStore(STORES.exams);
    const prescriptionStore = transaction.objectStore(STORES.prescriptions);

    for (const id of ids) {
      await deleteByPatientIndex(examStore, id);
      await deleteByPatientIndex(prescriptionStore, id);
      await fromRequest(patientStore.delete(id));
    }
  }
}

/** Varre o índice `patientId` de um store e apaga tudo que casar. */
function deleteByPatientIndex(
  store: IDBObjectStore,
  patientId: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const request = store.index('patientId').openCursor(patientId);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const cursor = request.result;
      if (!cursor) {
        resolve();
        return;
      }
      const deletion = cursor.delete();
      deletion.onerror = () => reject(deletion.error);
      deletion.onsuccess = () => cursor.continue();
    };
  });
}
