import { Service } from '@angular/core';
import type { Exams } from '@domain/entities';
import {
  ConnectionType,
  STORES,
  fromRequest,
  getConnection,
} from '@infra/frameworks/indexed-connection';
import { backfilled } from '../stamp';

@Service()
export class ExamGetRepository {
  async list(patientId: string): Promise<Exams[]> {
    const db = await getConnection();
    const store = db
      .transaction(STORES.exams, ConnectionType.READONLY)
      .objectStore(STORES.exams);
    const exams = (await fromRequest(store.getAll())).map(backfilled);
    return exams.filter((exam: Exams) => exam.patientId === patientId);
  }

  async findById(id: string): Promise<Exams> {
    const db = await getConnection();
    const store = db
      .transaction(STORES.exams, ConnectionType.READONLY)
      .objectStore(STORES.exams);
    return backfilled(await fromRequest(store.get(id)));
  }
}
