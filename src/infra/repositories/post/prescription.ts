import { inject, Service } from '@angular/core';
import type { Prescription } from '@domain/entities';
import type { ListPagination } from '@domain/use-cases';
import { FIRESTORE } from '@infra/frameworks/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { paginateStore } from '../paginate';
import { stamped } from '../stamp';

@Service()
export class PrescriptionPostRepository {
  private readonly firestore = inject(FIRESTORE);

  async listPagination(
    params: ListPagination.Params,
  ): Promise<ListPagination.Response<Prescription>> {
    return paginateStore<Prescription>(
      this.firestore,
      'prescriptions',
      {
        keywordField: 'medicament',
        orderBy: 'updatedAt',
        indexed: { patientId: 'patientId', status: 'status' },
      },
      params,
    );
  }

  async save(prescription: Prescription): Promise<void> {
    const entity = stamped(prescription);
    const docRef = doc(this.firestore, 'prescriptions', entity.id);
    await setDoc(docRef, entity);
  }
}
