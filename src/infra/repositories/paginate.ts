import type { Syncable } from '@domain/entities';
import type { ListPagination } from '@domain/use-cases';
import { filterBy, type FilterKey } from '../client/filters';
import {
  ConnectionType,
  fromRequest,
  getConnection,
} from '../frameworks/indexed-connection';
import { backfilled } from './stamp';

type Options<T> = {
  /** Campo usado pela busca textual livre. */
  keywordField: keyof T;
  /**
   * Índice que define a ordem de exibição.
   *
   * Passou a ser obrigatório quando a chave virou UUID: com chave
   * autoincremental, `getAll()` devolvia os registros na ordem de cadastro
   * por acaso, porque a ordem da chave coincidia com a de inserção. UUID é
   * aleatório, então sem ordenar explícito a lista embaralha a cada
   * gravação.
   */
  orderBy: string;
  /** Filtros que têm índice: `chave do filtro` -> `nome do índice`. */
  indexed?: Record<string, string>;
};

/**
 * Filtragem, busca textual e paginação sobre um object store.
 *
 * Quando um dos filtros tem índice, a leitura parte dele em vez de varrer o
 * store inteiro — é a diferença entre ler os pacientes de uma cidade e ler
 * todos para depois descartar. A busca textual continua em memória porque o
 * IndexedDB não faz casamento por substring.
 */
export async function paginateStore<T extends Syncable>(
  storeName: string,
  { keywordField, orderBy, indexed = {} }: Options<T>,
  { page, pageSize, filters, keywords }: ListPagination.Params,
): Promise<ListPagination.Response<T>> {
  const db = await getConnection();
  const store = db
    .transaction(storeName, ConnectionType.READONLY)
    .objectStore(storeName);

  const aplicaveis = filters ?? [];
  const comIndice = aplicaveis.find(
    (f) => indexed[String(f['key'])] && f.value,
  );

  // Sem filtro indexado, a leitura já sai ordenada pelo índice de ordenação.
  // Com filtro, parte do índice do filtro e ordena depois — o conjunto aqui
  // já está reduzido.
  let records: T[] = comIndice
    ? await fromRequest(
        store.index(indexed[String(comIndice['key'])]).getAll(comIndice.value),
      )
    : await fromRequest(store.index(orderBy).getAll());

  records = records.map((record) => backfilled(record));

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
