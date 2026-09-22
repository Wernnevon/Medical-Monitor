import { nowTimestamp } from '@core/utils/date-utils';
import type { Syncable } from '@domain/entities';

/**
 * Prepara a entidade para gravação: gera a chave, se ainda não houver, e
 * carimba `updatedAt`.
 *
 * A chave é um UUID gerado aqui, e não pelo banco. Chave autoincremental é
 * atribuída localmente, então dois dispositivos offline criariam o mesmo
 * identificador para pacientes diferentes — a colisão apareceria só no
 * primeiro sync, quando já é tarde.
 */
export function stamped<T extends Syncable>(entity: T): T {
  return {
    ...entity,
    id: entity.id || crypto.randomUUID(),
    updatedAt: nowTimestamp(),
  };
}

/**
 * Preenche `updatedAt` em registros gravados antes do campo existir.
 *
 * Sem isso, um registro antigo pareceria eternamente mais novo (ou mais
 * velho, a depender da comparação) que qualquer edição recente.
 */
export function backfilled<T extends Syncable>(entity: T): T {
  if (!entity || entity.updatedAt) return entity;
  return { ...entity, updatedAt: new Date(0).toISOString() };
}
