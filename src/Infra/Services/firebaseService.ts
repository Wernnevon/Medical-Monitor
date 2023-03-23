// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

import Patient from "../DAOarchive/model";

// Your web app's Firebase configuration
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

const db = getFirestore(app);

async function savePatient(patient: Patient) {
  try {
    await addDoc(collection(db, "Pacientes"), {
      ...patient,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error(error);
  }
}

function getPatient(callback: (arg: Patient[]) => void) {
  return onSnapshot(
    query(collection(db, "Pacientes"), orderBy("timestamp", "asc")),
    (querySnapshot) => {
      const patient = querySnapshot.docs.map(
        (doc) =>
          ({
            ...doc.data(),
          } as Patient)
      );
      callback(patient);
    }
  );
}

export { savePatient, getPatient };
