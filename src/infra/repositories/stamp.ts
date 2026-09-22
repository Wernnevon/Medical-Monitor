import { nowTimestamp } from '@core/utils/date-utils';
import type { Syncable } from '@domain/entities';

/**
 * Carimba `updatedAt` na escrita.
 *
 * Toda gravação passa por aqui, de modo que o campo esteja sempre presente
 * quando a sincronização remota entrar e precisar resolver conflito por
 * "quem escreveu por último".
 */
export function stamped<T extends Syncable>(entity: T): T {
  return { ...entity, updatedAt: nowTimestamp() };
}

/**
 * Preenche `updatedAt` em registros gravados antes do campo existir.
 *
 * Sem isso, um registro antigo pareceria eternamente mais novo (ou mais
 * velho, a depender da comparação) que qualquer edição recente. O backfill é
 * feito na leitura e não numa migração porque object stores do IndexedDB não
 * têm schema — não há passo de migração onde encaixar isso.
 */
export function backfilled<T extends Syncable>(entity: T): T {
  if (!entity || entity.updatedAt) return entity;
  return { ...entity, updatedAt: new Date(0).toISOString() };
}
