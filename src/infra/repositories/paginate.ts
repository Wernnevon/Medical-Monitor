import type { Syncable } from '@domain/entities';
import type { ListPagination } from '@domain/use-cases';
import { filterBy, type FilterKey } from '../client/filters';
import { backfilled } from './stamp';
import { collection, query, where, getDocs, orderBy as firestoreOrderBy, Firestore } from 'firebase/firestore';

type Options<T> = {
  /** Campo usado pela busca textual livre. */
  keywordField: keyof T;
  /** Índice que define a ordem de exibição. */
  orderBy: string;
  /** Filtros que têm índice: `chave do filtro` -> `nome do índice`. */
  indexed?: Record<string, string>;
};

export async function paginateStore<T extends Syncable>(
  firestore: Firestore,
  collectionName: string,
  { keywordField, orderBy, indexed = {} }: Options<T>,
  { page, pageSize, filters, keywords }: ListPagination.Params,
): Promise<ListPagination.Response<T>> {
  const aplicaveis = filters ?? [];
  const comIndice = aplicaveis.find(
    (f) => indexed[String(f['key'])] && f.value,
  );

  let q;
  if (comIndice) {
    q = query(
      collection(firestore, collectionName),
      where(indexed[String(comIndice['key'])], '==', comIndice.value)
    );
  } else {
    q = query(
      collection(firestore, collectionName),
      firestoreOrderBy(orderBy)
    );
  }

  const querySnapshot = await getDocs(q);
  let records: T[] = querySnapshot.docs.map(doc => backfilled(doc.data() as T));

  const restantes = aplicaveis.filter((f) => f !== comIndice);
  if (restantes.length) {
    records = records.filter((record) =>
      restantes.every((filter) =>
        filterBy({
          key: filter['key'] as FilterKey,
          value: filter.value,
          record,
        }),
      ),
    );
  }

  if (keywords?.length) {
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

  if (comIndice) {
    records = ordenaPor(records, orderBy);
  }

  const totalEntries = records.length;
  const start = (page - 1) * pageSize;

  return { entries: records.slice(start, start + pageSize), totalEntries };
}

/** Ordena pelo mesmo caminho que o índice usaria, inclusive aninhado. */
function ordenaPor<T>(records: T[], caminho: string): T[] {
  const ler = (registro: any) =>
    caminho.split('.').reduce((valor, parte) => valor?.[parte], registro);

  return [...records].sort((a, b) => {
    const va = ler(a);
    const vb = ler(b);
    if (va === vb) return 0;
    if (va == null) return 1;
    if (vb == null) return -1;
    return typeof va === 'string' && typeof vb === 'string'
      ? va.localeCompare(vb, 'pt-BR')
      : va < vb
        ? -1
        : 1;
  });
}
