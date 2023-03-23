import Patient from "./model";

import { DBPromise } from "../DB/db";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";

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

const store = async () =>
  await db.transaction(["patients"], "readwrite").objectStore("patients");

function uuidv4() {
  return "xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

async function verifyIdExists(id: string) {
  const keys: string[] = (await DBPromise(
    await (await store()).getAllKeys()
  )) as string[];
  return keys.includes(id);
}

export async function create(patient: Patient) {
  if (!patient.id) {
    const idTest = uuidv4();
    const rs: any = await verifyIdExists(idTest);
    if (rs) {
      create(patient);
    }
    patient.id = idTest;
  }
  console.log(patient.id);
  try {
    await DBPromise((await store()).add(patient));
    // console.log("Success", request);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function index(): Promise<Patient[]> {
  return (await DBPromise((await store()).getAll())) as Array<Patient>;
}

export async function update(patient: Patient) {
  try {
    await DBPromise((await store()).put(patient));
  } catch (error) {
    console.error(error);
  }
}

export async function remove(patientId: string) {
  try {
    await DBPromise((await store()).delete(patientId));
  } catch (error) {
    console.error(error);
  }
}

export async function findById(id: string) {
  const res = (await DBPromise((await store()).get(id))) as Array<Patient>;
  return res;
}
/**
 * 1: atualizar os dados locais para online
 * 2: limpar banco local após atualização dos dados no firebase
 * 3: insere todos os dados online no banco local
 */

const firebaseConfig = {
  apiKey: "AIzaSyDUQptcMq1zviW53uHnHsAzTvtkL1hRvco",
  authDomain: "medical-monitor-8ac07.firebaseapp.com",
  projectId: "medical-monitor-8ac07",
  storageBucket: "medical-monitor-8ac07.appspot.com",
  messagingSenderId: "127165243890",
  appId: "1:127165243890:web:7f1c73253dc533bf024b6b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firebaseDB = getFirestore(app);
const collectionRef = collection(firebaseDB, "Pacientes");
export async function syncIndexedDBAndFirestore() {
  // Sync Firebase with IndexedDB
  onSnapshot(query(collectionRef), (querySnapshot) => {
    if (!querySnapshot.empty) {
      querySnapshot.docs.map(async (doc) => {
        const rs = await verifyIdExists(doc.id);
        if (!rs) {
          await create(doc.data() as Patient);
        }
      });
    }
  });

  // Sync IndexedDB with Firebase
  (await store()).openCursor().onsuccess = async (event: any) => {
    const cursor = event.target.result;
    if (cursor) {
      const id = cursor.value.id;
      const patient = { ...cursor.value };
      console.log("@@@", patient);
      const rs = !(await (
        await getDoc(doc(firebaseDB, "Pacientes", id || ""))
      ).data());
      if (rs) await setDoc(doc(firebaseDB, "Pacientes", id || ""), patient);
    }
  };

  // clear db
  // await clearDB();
}

async function clearDB() {
  const transaction = db.transaction(["patients"], "readwrite");
  const patientTable = transaction.objectStore("patients");
  try {
    await DBPromise(patientTable.clear());
  } catch (error) {
    console.error(error);
  }
}
