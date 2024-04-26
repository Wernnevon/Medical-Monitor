import Patient from "./model";

import { DBPromise } from "../DB/db";
import mockDB from "../DB/db.json"

const DBRequest = window.indexedDB.open("pacientes", 1);
let db: IDBDatabase;

DBRequest.onsuccess = function () {
  db = this.result;
};

DBRequest.onerror = function () {
  console.error(`Error ${this.error}`);
};

DBRequest.onupgradeneeded = function () {
  db = this.result;
  db.createObjectStore("patients", { keyPath: "id" });
};

function uuidv4() {
  return "xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

async function verifyIdExists(id: string) {
  let keys: any = await DBPromise(
    db
      .transaction(["patients"], "readonly")
      .objectStore("patients")
      .getAllKeys()
  );
  return keys.includes(id);
}

export async function create(patient: Patient) {
  const idTest = uuidv4();
  const rs: any = await verifyIdExists(idTest);
  if (rs) {
    create(patient);
  }
  const transaction = db.transaction(["patients"], "readwrite");
  const patientTable = transaction.objectStore("patients");
  patient.id = idTest;
  try {
    const request = await DBPromise(patientTable.add(patient));
    console.log("Success", request);
  } catch (error) {
    console.error(error);
  }
}

export async function index(): Promise<Patient[]> {
  return (await DBPromise(
    db.transaction(["patients"], "readonly").objectStore("patients").getAll(null, 10)
  )) as Array<Patient>;
}

// function findById(id: string | undefined) {}

export async function update(patient: Patient) {
  const transaction = db.transaction(["patients"], "readwrite");
  const patientTable = transaction.objectStore("patients");
  try {
    await DBPromise(patientTable.put(patient));
  } catch (error) {
    console.error(error);
  }
}

export function remove(patientId: string | undefined) {}

// Carrega o banco de dev
export async function bootstrapDb(){
  const res = await index()
  if (res.length === 0) mockDB.forEach(p => create(p as unknown as Patient))
}

export async function clearDB() {
  const transaction = db.transaction(["patients"], "readwrite");
  const patientTable = transaction.objectStore("patients");
  try {
    await DBPromise(patientTable.clear());
  } catch (error) {
    console.error(error);
  }
}