import { Service } from '@angular/core';
import type { Exams } from '@domain/entities';
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
export class ExamPostRepository {
  async listPagination(
    params: ListPagination.Params,
  ): Promise<ListPagination.Response<Exams>> {
    return paginateStore<Exams>(
      STORES.exams,
      {
        keywordField: 'name',
        orderBy: 'name',
        indexed: { patientId: 'patientId', status: 'status' },
      },
      params,
    );
  }

  async save(exam: Exams): Promise<void> {
    const db = await getConnection();
    const store = db
      .transaction(STORES.exams, ConnectionType.READWRITE)
      .objectStore(STORES.exams);
    await fromRequest(store.add(stamped(exam)));
  }
}
