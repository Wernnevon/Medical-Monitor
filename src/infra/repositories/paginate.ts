import type { ListPagination } from '@domain/use-cases';
import { filterBy, type FilterKey } from '../client/filters';
import {
  ConnectionType,
  fromRequest,
  getConnection,
} from '../frameworks/indexed-connection';
import { backfilled } from './stamp';

/**
 * Filtragem + busca textual + paginação sobre um object store.
 *
 * Os três repositórios de escrita repetiam este bloco palavra por palavra,
 * variando apenas o store e o campo usado na busca livre. `keywordField`
 * captura essa diferença.
 */
export async function paginateStore<T>(
  storeName: string,
  keywordField: keyof T,
  { page, pageSize, filters, keywords }: ListPagination.Params,
): Promise<ListPagination.Response<T>> {
  const db = await getConnection();
  const store = db
    .transaction(storeName, ConnectionType.READONLY)
    .objectStore(storeName);

  let records: T[] = (await fromRequest(store.getAll())).map(backfilled);

  if (filters?.length) {
    records = records.filter((record) =>
      filters.every((filter) =>
        filterBy({
          key: filter['key'] as FilterKey,
          value: filter.value,
          record,
        }),
      ),
    );
  }

  if (keywords) {
    records = records.filter((record) =>
      keywords.every((keyword) =>
        filterBy({
          key: 'text',
          value: keyword,
          record: record[keywordField],
        }),
      ),
    );
  }

  const totalEntries = records.length;
  const start = (page - 1) * pageSize;
  const entries = records.slice(start, start + pageSize);

  return { entries, totalEntries };
}
