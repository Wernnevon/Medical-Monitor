import Patient from "./model";
import * as fs from "fs";
import { LoadDB } from "../DB/db";

const dbPath = "src/Infra/DB/db.json";

function uuidv4() {
  return "xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function checkId(id: string) {
  const patientList = index();
  const exists = patientList.some(
    ({ personalData }: Patient) => personalData.id === id
  );
  if (exists) {
    console.log("id igual");
    return uuidv4();
  }
  return id;
}

export function create(patient: Patient) {
  let db = LoadDB();
  patient.personalData.id = checkId(uuidv4());
  db.push(patient);
  // fs.writeFile(dbPath, JSON.stringify(db), function (err) {
  //   if (err) throw err;
  // });
}

export function index() {
  // const patients: Patient[] = LoadDB();
  const patients: Patient[] = [];
  return patients;
}

function findById(id: string | undefined) {
  // const patients: Patient[] = LoadDB();
  const patients: Patient[] = [];

  let paciente = patients.filter((patient) => patient.personalData.id === id);
  return paciente[0];
}

export function update(patient: Patient) {
  let patients: Patient[] = LoadDB();
  const updateIndex = patients.findIndex(
    (p: Patient) => patient.personalData.id === p.personalData.id
  );
  patients.splice(updateIndex, 1, patient);
  // fs.writeFile(dbPath, JSON.stringify(patients), function (err) {
  //   if (err) throw err;
  // });
}

export function remove(patientId: string | undefined) {
  let patients: Patient[] = LoadDB();
  if (patientId) {
    patients = patients.filter(
      (patient) => patient.personalData.id !== patientId
    );
    // fs.writeFile(dbPath, JSON.stringify(patients), function (err) {
    //   if (err) throw err;
    // });
  }
  console.log(patients);
}
