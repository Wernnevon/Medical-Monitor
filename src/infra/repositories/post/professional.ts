import { Service } from '@angular/core';
import type { Professional } from '@domain/entities';
import {
  ConnectionType,
  STORES,
  fromRequest,
  getConnection,
} from '../../frameworks/indexed-connection';
import { stamped } from '../stamp';

@Service()
export class ProfessionalPostRepository {
  async save(professional: Professional): Promise<void> {
    const db = await getConnection();
    const store = db
      .transaction(STORES.professionals, ConnectionType.READWRITE)
      .objectStore(STORES.professionals);
    await fromRequest(store.add(stamped(professional)));
  }
}
