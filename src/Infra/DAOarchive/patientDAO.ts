import Patient from "./model";
import fs from "fs";
import {LoadDB} from '../DB/db';

const dbPath = "src/Infra/DB/db.json";

function uuidv4() {
  return 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function create(patient: Patient) {
  let db = LoadDB();
  patient.id = uuidv4();
  db.push(patient);
  fs.writeFile(dbPath, JSON.stringify(db), function (err) {
    if (err) throw err; 
  });
}

export function index() {
  const patients: Patient[] = LoadDB();
  return patients;
}

export function findByName(name: string){
  const patients: Patient[] = LoadDB();
  return patients.filter(patient => patient.name.includes(name));
}

function findById(id: string | undefined){
  const patients: Patient[] = LoadDB();
  let paciente = patients.filter(patient => patient.id === id);
  return paciente[0]
}

export function update(patient: Patient){
  let patients: Patient[] = LoadDB();
  let oldPatient = findById(patient.id);
  patients.splice(patients.indexOf(oldPatient), 1, patient);
  fs.writeFile(dbPath, JSON.stringify(patients), function (err) {
    if (err) throw err; 
  });
}

export function remove(patientId: string | undefined){
  let patients: Patient[] = LoadDB();
  if(patientId){
    patients = patients.filter((patient) => patient.id !== patientId);
    fs.writeFile(dbPath, JSON.stringify(patients), function (err) {
      if (err) throw err; 
    });
  }
  console.log(patients);
}