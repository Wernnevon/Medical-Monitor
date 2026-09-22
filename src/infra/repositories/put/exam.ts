import { Service, inject } from '@angular/core';
import { getStringToday } from '@core/utils/date-utils';
import { ExamStatus, type Exams } from '@domain/entities';
import {
  ConnectionType,
  STORES,
  fromRequest,
  getConnection,
} from '@infra/frameworks/indexed-connection';
import { ExamGetRepository } from '../get';
import { stamped } from '../stamp';

@Service()
export class ExamPutRepository {
  // O original chamava `GetExam.prototype.findById(id)` — método solto no
  // protótipo, sem instância. Só funcionava porque `findById` não usa `this`.
  private readonly examGet = inject(ExamGetRepository);

  async update(exam: Exams): Promise<void> {
    const db = await getConnection();
    const store = db
      .transaction(STORES.exams, ConnectionType.READWRITE)
      .objectStore(STORES.exams);
    await fromRequest(store.put(stamped(exam)));
  }

  async changeStatus(id: number): Promise<void> {
    const exam = await this.examGet.findById(id);

    const next: Exams = {
      ...exam,
      status:
        exam.status === ExamStatus.DONE
          ? ExamStatus.IN_PROGRESS
          : ExamStatus.DONE,
    };

    if (next.status === ExamStatus.IN_PROGRESS) {
      delete next.realizationDate;
    } else {
      // As datas são declaradas `Date` nas entidades mas trafegam como string
      // "YYYY-MM-DD" em todo o app — é o que `formmatDate` espera receber e o
      // que os inputs `type="date"` produzem. O cast preserva o comportamento
      // atual; a tipagem será acertada junto com o port da camada de
      // apresentação, onde todos os consumidores ficam visíveis.
      next.realizationDate = getStringToday() as unknown as Date;
    }

    await this.update(next);
  }
}
