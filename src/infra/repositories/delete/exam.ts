import { Service, inject } from '@angular/core';
import { FIRESTORE } from '@infra/frameworks/firebase';
import { doc, writeBatch } from 'firebase/firestore';

@Service()
export class ExamDeleteRepository {
  private readonly firestore = inject(FIRESTORE);

  async delete(ids: string[]): Promise<void> {
    const batch = writeBatch(this.firestore);
    for (const id of ids) {
      batch.delete(doc(this.firestore, 'exams', id));
    }
    await batch.commit();
  }
}
