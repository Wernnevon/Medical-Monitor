import { Patient } from "../../../Domain/Entities";
import {
  ConnectionType,
  getConnection,
} from "../../Frameworks/indexedConnection";

export class PatientRepository {
  async list(): Promise<Patient[]> {
    const db = await getConnection();
    const transaction = db.transaction("patients", ConnectionType.READONLY);
    const objectStore = transaction.objectStore("patients");
    const request = objectStore.getAll();
    return new Promise((resolve, reject) => {
      request.onerror = () => {
        reject(request.error);
      };
      request.onsuccess = () => {
        resolve(request.result);
      };
    });
  }

  async findById(id: number): Promise<Patient> {
    const db = await getConnection();
    const transaction = db.transaction("patients", ConnectionType.READONLY);
    const objectStore = transaction.objectStore("patients");
    const request = objectStore.get(id);
    return new Promise((resolve, reject) => {
      request.onerror = () => {
        reject(request.error);
      };
      request.onsuccess = () => {
        resolve(request.result);
      };
    });
  }

  async listCities(): Promise<string[]> {
    const db = await getConnection();
    const transaction = db.transaction("patients", ConnectionType.READONLY);
    const objectStore = transaction.objectStore("patients");
    const request = objectStore.getAll();
    return new Promise((resolve, reject) => {
      request.onerror = () => {
        reject(request.error);
      };
      request.onsuccess = () => {
        resolve(request.result.map(({ adress: { city } }: Patient) => city));
      };
    });
  }

  async listInsurances(): Promise<string[]> {
    const db = await getConnection();
    const transaction = db.transaction("patients", ConnectionType.READONLY);
    const objectStore = transaction.objectStore("patients");
    const request = objectStore.getAll();
    return new Promise((resolve, reject) => {
      request.onerror = () => {
        reject(request.error);
      };
      request.onsuccess = () => {
        resolve(
          request.result.map(
            ({ health: { healthInsurance: insurance } }: Patient) => insurance
          )
        );
      };
    });
  }
}
