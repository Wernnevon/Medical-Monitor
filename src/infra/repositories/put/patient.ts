import { inject, Service } from '@angular/core';
import type { Patient } from '@domain/entities';
import { FIRESTORE } from '@infra/frameworks/firebase';
import { doc, updateDoc, arrayUnion, arrayRemove, deleteField } from 'firebase/firestore';
import { stamped } from '../stamp';
import { nowTimestamp } from '@core/utils/date-utils';

const READING_FIELDS = new Set([
  'bloodPressureReadings',
  'glycemiaReadings',
  'oxygenSaturationReadings',
  'heartRateReadings',
]);

@Service()
export class PatientPutRepository {
  private readonly firestore = inject(FIRESTORE);

  async update(patient: Patient): Promise<void> {
    const { health, ...resto } = stamped(patient);
    const docRef = doc(this.firestore, 'patients', resto.id);

    // `health` vai campo a campo e sem as listas de aferições: gravar o mapa
    // inteiro devolveria ao banco a cópia que a tela leu, apagando leituras
    // que outra pessoa registrou nesse meio-tempo. Aferições só mudam por
    // `addReading`/`removeReading`, que são atômicos.
    const camposSaude = Object.fromEntries(
      Object.entries(health ?? {})
        .filter(([campo]) => !READING_FIELDS.has(campo))
        .map(([campo, valor]) => [`health.${campo}`, valor ?? deleteField()]),
    );

    // Campo esvaziado no formulário chega como `undefined`, que o Firestore
    // ignora (`ignoreUndefinedProperties`) — sem `deleteField()` o valor
    // antigo continuaria salvo.
    const campos = Object.fromEntries(
      Object.entries(resto).map(([campo, valor]) => [campo, valor ?? deleteField()]),
    );

    await updateDoc(docRef, { ...campos, ...camposSaude });
  }

  async addReading({ patientId, kind, reading }: any): Promise<void> {
    const docRef = doc(this.firestore, 'patients', patientId);
    await updateDoc(docRef, {
      [`health.${kind}`]: arrayUnion(reading),
      updatedAt: nowTimestamp()
    });
  }

  async removeReading({ patientId, kind, reading }: any): Promise<void> {
    const docRef = doc(this.firestore, 'patients', patientId);
    await updateDoc(docRef, {
      [`health.${kind}`]: arrayRemove(reading),
      updatedAt: nowTimestamp()
    });
  }
}
