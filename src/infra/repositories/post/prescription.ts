import { Service } from '@angular/core';
import type { Prescription } from '@domain/entities';
import type { ListPagination } from '@domain/use-cases';
import {
  ConnectionType,
  STORES,
  fromRequest,
  getConnection,
} from '../../frameworks/indexed-connection';
import { paginateStore } from '../paginate';
import { stamped } from '../stamp';

@Service()
export class PrescriptionPostRepository {
  async listPagination(
    params: ListPagination.Params,
  ): Promise<ListPagination.Response<Prescription>> {
    return paginateStore<Prescription>(
      STORES.prescriptions,
      {
        keywordField: 'medicament',
        orderBy: 'updatedAt',
        indexed: { patientId: 'patientId', status: 'status' },
      },
      params,
    );
  }

  async save(prescription: Prescription): Promise<void> {
    const db = await getConnection();
    const store = db
      .transaction(STORES.prescriptions, ConnectionType.READWRITE)
      .objectStore(STORES.prescriptions);
    await fromRequest(store.add(stamped(prescription)));
  }
}
