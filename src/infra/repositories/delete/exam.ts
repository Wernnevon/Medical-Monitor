import { Service } from '@angular/core';
import {
  ConnectionType,
  STORES,
  fromRequest,
  getConnection,
} from '@infra/frameworks/indexed-connection';

@Service()
export class ExamDeleteRepository {
  async delete(ids: string[]): Promise<void> {
    const db = await getConnection();
    const store = db
      .transaction(STORES.exams, ConnectionType.READWRITE)
      .objectStore(STORES.exams);
    await Promise.all(ids.map((id) => fromRequest(store.delete(id))));
  }
}
