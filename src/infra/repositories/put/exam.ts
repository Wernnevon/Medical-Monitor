import { Service, inject } from '@angular/core';
import { getStringToday, nowTimestamp } from '@core/utils/date-utils';
import { ExamStatus, type Exams } from '@domain/entities';
import { FIRESTORE } from '@infra/frameworks/firebase';
import { doc, updateDoc, runTransaction, deleteField } from 'firebase/firestore';
import { stamped } from '../stamp';

@Service()
export class ExamPutRepository {
  private readonly firestore = inject(FIRESTORE);

  async update(exam: Exams): Promise<void> {
    const entity = stamped(exam);
    const docRef = doc(this.firestore, 'exams', entity.id);
    await updateDoc(docRef, { ...entity });
  }

  async changeStatus(id: string): Promise<void> {
    const docRef = doc(this.firestore, 'exams', id);
    
    await runTransaction(this.firestore, async (transaction) => {
      const sfDoc = await transaction.get(docRef);
      if (!sfDoc.exists()) {
        throw new Error('Exame não existe!');
      }

      const exam = sfDoc.data() as Exams;
      const novoStatus = exam.status === ExamStatus.DONE ? ExamStatus.IN_PROGRESS : ExamStatus.DONE;
      
      const updateData: any = {
        status: novoStatus,
        updatedAt: nowTimestamp()
      };

      if (novoStatus === ExamStatus.IN_PROGRESS) {
        updateData.realizationDate = deleteField();
      } else {
        updateData.realizationDate = getStringToday() as unknown as Date;
      }

      transaction.update(docRef, updateData);
    });
  }
}
