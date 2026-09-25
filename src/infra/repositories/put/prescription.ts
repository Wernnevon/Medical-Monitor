import { Service, inject } from '@angular/core';
import { PrescriptionStatus, type Prescription } from '@domain/entities';
import { FIRESTORE } from '@infra/frameworks/firebase';
import { doc, updateDoc, runTransaction } from 'firebase/firestore';
import { stamped } from '../stamp';
import { nowTimestamp } from '@core/utils/date-utils';

@Service()
export class PrescriptionPutRepository {
  private readonly firestore = inject(FIRESTORE);

  async update(prescription: Prescription): Promise<void> {
    const entity = stamped(prescription);
    const docRef = doc(this.firestore, 'prescriptions', entity.id);
    await updateDoc(docRef, { ...entity });
  }

  async changeStatus(id: string): Promise<void> {
    const docRef = doc(this.firestore, 'prescriptions', id);
    
    await runTransaction(this.firestore, async (transaction) => {
      const sfDoc = await transaction.get(docRef);
      if (!sfDoc.exists()) {
        throw new Error('Prescrição não existe!');
      }

      const prescription = sfDoc.data() as Prescription;
      const novoStatus = prescription.status === PrescriptionStatus.SUSPENDED 
          ? PrescriptionStatus.ADMINISTERING 
          : PrescriptionStatus.SUSPENDED;
      
      transaction.update(docRef, {
        status: novoStatus,
        updatedAt: nowTimestamp()
      });
    });
  }
}
