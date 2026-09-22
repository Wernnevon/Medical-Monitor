import { Service } from '@angular/core';
import type { Patient } from '@domain/entities';
import {
  ConnectionType,
  STORES,
  fromRequest,
  getConnection,
} from '@infra/frameworks/indexed-connection';
import { stamped } from '../stamp';

@Service()
export class PatientPutRepository {
  async update(patient: Patient): Promise<void> {
    const db = await getConnection();
    const store = db
      .transaction(STORES.patients, ConnectionType.READWRITE)
      .objectStore(STORES.patients);
    await fromRequest(store.put(stamped(patient)));
  }
}
