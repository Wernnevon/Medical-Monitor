import { inject, Service } from '@angular/core';
import type { Exams } from '@domain/entities';
import { FIRESTORE } from '@infra/frameworks/firebase';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { backfilled } from '../stamp';

@Service()
export class ExamGetRepository {
  private readonly firestore = inject(FIRESTORE);
  private readonly collectionName = 'exams';

  async list(patientId: string): Promise<Exams[]> {
    const q = query(
      collection(this.firestore, this.collectionName),
      where('patientId', '==', patientId),
    );
    const querySnapshot = await getDocs(q);
    // Ordenado em memória: `where` + `orderBy` em campos diferentes exige
    // índice composto, e sem ele a consulta falha e o histórico some.
    return querySnapshot.docs
      .map(doc => backfilled(doc.data() as Exams))
      .sort((a, b) => (b.updatedAt ?? '').localeCompare(a.updatedAt ?? ''));
  }

  async findById(id: string): Promise<Exams> {
    const docRef = doc(this.firestore, this.collectionName, id);
    const snap = await getDoc(docRef);
    if (!snap.exists()) throw new Error('Exame não encontrado');
    return backfilled(snap.data() as Exams);
  }
}
