import { inject, Service } from '@angular/core';
import type { Patient } from '@domain/entities';
import { FIRESTORE } from '@infra/frameworks/firebase';
import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore';
import { backfilled } from '../stamp';

@Service()
export class PatientGetRepository {
  private readonly firestore = inject(FIRESTORE);
  private readonly collectionName = 'patients';

  private async readAll(): Promise<Patient[]> {
    const q = query(collection(this.firestore, this.collectionName));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => backfilled(doc.data() as Patient));
  }

  async list(): Promise<Patient[]> {
    return this.readAll();
  }

  async findById(id: string): Promise<Patient> {
    const docRef = doc(this.firestore, this.collectionName, id);
    const snap = await getDoc(docRef);
    if (!snap.exists()) throw new Error('Paciente não encontrado');
    return backfilled(snap.data() as Patient);
  }

  async listCities(): Promise<string[]> {
    const patients = await this.readAll();
    return patients.map(({ adress: { city } }) => city);
  }

  async listInsurances(): Promise<string[]> {
    const patients = await this.readAll();
    return patients.map(({ health: { healthInsurance } }) => healthInsurance);
  }
}
