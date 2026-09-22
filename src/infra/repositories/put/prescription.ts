import { Service, inject } from '@angular/core';
import {
  PrescriptionStatus,
  type Prescription,
} from '@domain/entities';
import {
  ConnectionType,
  STORES,
  fromRequest,
  getConnection,
} from '@infra/frameworks/indexed-connection';
import { PrescriptionGetRepository } from '../get';
import { stamped } from '../stamp';

@Service()
export class PrescriptionPutRepository {
  private readonly prescriptionGet = inject(PrescriptionGetRepository);

  async update(prescription: Prescription): Promise<void> {
    const db = await getConnection();
    const store = db
      .transaction(STORES.prescriptions, ConnectionType.READWRITE)
      .objectStore(STORES.prescriptions);
    await fromRequest(store.put(stamped(prescription)));
  }

  async changeStatus(id: number): Promise<void> {
    const prescription = await this.prescriptionGet.findById(id);

    await this.update({
      ...prescription,
      status:
        prescription.status === PrescriptionStatus.SUSPENDED
          ? PrescriptionStatus.ADMINISTERING
          : PrescriptionStatus.SUSPENDED,
    });
  }
}
