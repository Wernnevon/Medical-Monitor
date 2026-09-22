import { Service } from '@angular/core';
import type { Patient } from '@domain/entities';
import {
  ConnectionType,
  STORES,
  fromRequest,
  getConnection,
} from '@infra/frameworks/indexed-connection';
import { backfilled } from '../stamp';

@Service()
export class PatientGetRepository {
  private async readAll(): Promise<Patient[]> {
    const db = await getConnection();
    const store = db
      .transaction(STORES.patients, ConnectionType.READONLY)
      .objectStore(STORES.patients);
    return (await fromRequest(store.getAll())).map(backfilled);
  }

  async list(): Promise<Patient[]> {
    return this.readAll();
  }

  async findById(id: string): Promise<Patient> {
    const db = await getConnection();
    const store = db
      .transaction(STORES.patients, ConnectionType.READONLY)
      .objectStore(STORES.patients);
    return backfilled(await fromRequest(store.get(id)));
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
