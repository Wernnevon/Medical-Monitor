import { Service } from '@angular/core';
import type { Prescription } from '@domain/entities';
import {
  ConnectionType,
  STORES,
  fromRequest,
  getConnection,
} from '@infra/frameworks/indexed-connection';
import { backfilled } from '../stamp';

@Service()
export class PrescriptionGetRepository {
  async list(patientId: number): Promise<Prescription[]> {
    const db = await getConnection();
    const store = db
      .transaction(STORES.prescriptions, ConnectionType.READONLY)
      .objectStore(STORES.prescriptions);
    const prescriptions = (await fromRequest(store.getAll())).map(backfilled);
    return prescriptions.filter(
      (prescription: Prescription) => prescription.patientId === patientId,
    );
  }

  async findById(id: number): Promise<Prescription> {
    const db = await getConnection();
    const store = db
      .transaction(STORES.prescriptions, ConnectionType.READONLY)
      .objectStore(STORES.prescriptions);
    return backfilled(await fromRequest(store.get(id)));
  }
}
