import { Service } from '@angular/core';
import type { Professional } from '@domain/entities';
import {
  ConnectionType,
  STORES,
  fromRequest,
  getConnection,
} from '@infra/frameworks/indexed-connection';
import { backfilled } from '../stamp';

@Service()
export class ProfessionalGetRepository {
  async findById(id: string): Promise<Professional> {
    const db = await getConnection();
    const store = db
      .transaction(STORES.professionals, ConnectionType.READONLY)
      .objectStore(STORES.professionals);
    return backfilled(await fromRequest(store.get(id)));
  }

  async findByUsername(username: string): Promise<Professional | null> {
    const db = await getConnection();
    const store = db
      .transaction(STORES.professionals, ConnectionType.READONLY)
      .objectStore(STORES.professionals);
    const found = await fromRequest(store.index('username').get(username));
    return found ? backfilled(found) : null;
  }
}
