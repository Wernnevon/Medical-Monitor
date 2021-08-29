import Patient from "./model";
import fs from "fs";

const dbPath = "src/Infra/DB/db.json";

function testPath(){
  if(!fs.existsSync(dbPath)){
    fs.appendFile(dbPath, JSON.stringify([]), function (err) {
      if (err) throw err;
    });
  }
};

export function create(patient: Patient) {
  let db = index();
  db.push(patient);
  fs.writeFile(dbPath, JSON.stringify(db), function (err) {
    if (err) throw err; 
  });
}

export function index() {
    async() => await testPath();
    let patients = fs.readFileSync(dbPath, {encoding:'utf8', flag:'r'})
    if(patients) return JSON.parse(patients);
    else return [{}];
}
