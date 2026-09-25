import { inject, Service } from '@angular/core';
import type { Exams } from '@domain/entities';
import type { ListPagination } from '@domain/use-cases';
import { FIRESTORE } from '@infra/frameworks/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { paginateStore } from '../paginate';
import { stamped } from '../stamp';

@Service()
export class ExamPostRepository {
  private readonly firestore = inject(FIRESTORE);

  async listPagination(
    params: ListPagination.Params,
  ): Promise<ListPagination.Response<Exams>> {
    return paginateStore<Exams>(
      this.firestore,
      'exams',
      {
        keywordField: 'name',
        orderBy: 'name',
        indexed: { patientId: 'patientId', status: 'status' },
      },
      params,
    );
  }

  async save(exam: Exams): Promise<void> {
    const entity = stamped(exam);
    const docRef = doc(this.firestore, 'exams', entity.id);
    await setDoc(docRef, entity);
  }
}
