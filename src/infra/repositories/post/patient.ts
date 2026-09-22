import { Service } from '@angular/core';
import type { Patient } from '@domain/entities';
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
export class PatientPostRepository {
  async listPagination(
    params: ListPagination.Params,
  ): Promise<ListPagination.Response<Patient>> {
    return paginateStore<Patient>(
      STORES.patients,
      {
        keywordField: 'name',
        orderBy: 'name',
        // Filtrar por cidade ou convênio parte do índice, em vez de ler
        // todos os pacientes para depois descartar a maioria.
        indexed: { city: 'city', healthInsurance: 'healthInsurance' },
      },
      params,
    );
  }

  async save(patient: Patient): Promise<void> {
    const db = await getConnection();
    const store = db
      .transaction(STORES.patients, ConnectionType.READWRITE)
      .objectStore(STORES.patients);
    await fromRequest(store.add(stamped(patient)));
  }
}
