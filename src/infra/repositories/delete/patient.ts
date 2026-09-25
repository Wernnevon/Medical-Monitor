import { Service, inject } from '@angular/core';
import { FIRESTORE } from '@infra/frameworks/firebase';
import { doc, writeBatch, collection, query, where, getDocs } from 'firebase/firestore';

@Service()
export class PatientDeleteRepository {
  private readonly firestore = inject(FIRESTORE);

  async delete(ids: string[]): Promise<void> {
    const batch = writeBatch(this.firestore);

    for (const id of ids) {
      batch.delete(doc(this.firestore, 'patients', id));
      
      const examsQuery = query(collection(this.firestore, 'exams'), where('patientId', '==', id));
      const examsSnap = await getDocs(examsQuery);
      examsSnap.docs.forEach(d => batch.delete(d.ref));

      const presQuery = query(collection(this.firestore, 'prescriptions'), where('patientId', '==', id));
      const presSnap = await getDocs(presQuery);
      presSnap.docs.forEach(d => batch.delete(d.ref));
    }

    await batch.commit();
  }
}
