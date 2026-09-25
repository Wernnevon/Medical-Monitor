import { inject, Service } from '@angular/core';
import type { Prescription } from '@domain/entities';
import { FIRESTORE } from '@infra/frameworks/firebase';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { backfilled } from '../stamp';

@Service()
export class PrescriptionGetRepository {
  private readonly firestore = inject(FIRESTORE);
  private readonly collectionName = 'prescriptions';

  async list(patientId: string): Promise<Prescription[]> {
    const q = query(
      collection(this.firestore, this.collectionName),
      where('patientId', '==', patientId),
    );
    const querySnapshot = await getDocs(q);
    // Ordenado em memória: `where` + `orderBy` em campos diferentes exige
    // índice composto, e sem ele a consulta falha e o histórico some.
    return querySnapshot.docs
      .map(doc => backfilled(doc.data() as Prescription))
      .sort((a, b) => (b.updatedAt ?? '').localeCompare(a.updatedAt ?? ''));
  }

  async findById(id: string): Promise<Prescription> {
    const docRef = doc(this.firestore, this.collectionName, id);
    const snap = await getDoc(docRef);
    if (!snap.exists()) throw new Error('Prescrição não encontrada');
    return backfilled(snap.data() as Prescription);
  }
}
