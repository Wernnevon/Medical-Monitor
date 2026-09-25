import { inject, Service } from '@angular/core';
import type { Patient } from '@domain/entities';
import type { ListPagination } from '@domain/use-cases';
import { FIRESTORE } from '@infra/frameworks/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { paginateStore } from '../paginate';
import { stamped } from '../stamp';

@Service()
export class PatientPostRepository {
  private readonly firestore = inject(FIRESTORE);

  async listPagination(
    params: ListPagination.Params,
  ): Promise<ListPagination.Response<Patient>> {
    return paginateStore<Patient>(
      this.firestore,
      'patients',
      {
        keywordField: 'name',
        orderBy: 'name',
        indexed: { city: 'adress.city', healthInsurance: 'health.healthInsurance' },
      },
      params,
    );
  }

  async save(patient: Patient): Promise<void> {
    const entity = stamped(patient);
    const docRef = doc(this.firestore, 'patients', entity.id);
    await setDoc(docRef, entity);
  }
}
