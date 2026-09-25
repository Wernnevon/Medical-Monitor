import { inject, Service } from '@angular/core';
import type { Professional } from '@domain/entities';
import { FIRESTORE } from '@infra/frameworks/firebase';
import { doc, getDoc, getDocFromCache, type DocumentReference } from 'firebase/firestore';

/** Quanto esperar pelo servidor antes de desistir — o SDK, sozinho, fica
 *  tentando reconectar por muito tempo e prende a tela no "Carregando…". */
const TEMPO_MAXIMO_MS = 8000;

export class ProfessionalNotFoundError extends Error {
  constructor() {
    super('Profissional não encontrado');
    this.name = 'ProfessionalNotFoundError';
  }
}

@Service()
export class ProfessionalGetRepository {
  private readonly firestore = inject(FIRESTORE);

  async findById(id: string): Promise<Professional> {
    const snap = await lerCacheAntes(doc(this.firestore, 'professionals', id));
    if (!snap.exists()) throw new ProfessionalNotFoundError();
    return snap.data() as Professional;
  }

  async findByUsername(username: string): Promise<Professional | null> {
    const userSnap = await lerCacheAntes(doc(this.firestore, 'usernames', username));
    if (!userSnap.exists()) return null;

    const uid = userSnap.data()['uid'];
    const profSnap = await lerCacheAntes(doc(this.firestore, 'professionals', uid));
    return profSnap.exists() ? (profSnap.data() as Professional) : null;
  }
}

/**
 * O perfil quase nunca muda, então o cache local basta e responde na hora —
 * inclusive offline. Só vai ao servidor quando o documento ainda não está em
 * cache (primeiro login no dispositivo), e com prazo.
 */
function lerCacheAntes(ref: DocumentReference) {
  // O prazo cobre a leitura do cache também: com várias abas abertas, o
  // cache persistente depende da aba "principal", e se ela travar a
  // leitura local fica esperando para sempre.
  return comPrazo(
    getDocFromCache(ref).catch(() => getDoc(ref)),
    TEMPO_MAXIMO_MS,
  );
}

function comPrazo<T>(promessa: Promise<T>, ms: number): Promise<T> {
  let timer: ReturnType<typeof setTimeout>;
  const prazo = new Promise<never>((_, reject) => {
    timer = setTimeout(
      () => reject(Object.assign(new Error('Tempo esgotado'), { code: 'unavailable' })),
      ms,
    );
  });
  return Promise.race([promessa, prazo]).finally(() => clearTimeout(timer));
}
