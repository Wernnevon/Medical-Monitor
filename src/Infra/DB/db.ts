import Patient from "../DAOarchive/model";
import fs from "fs";

const dbPath = "src/Infra/DB/db.json";


export function TestDb() {
    if (!fs.existsSync(dbPath)) {
        fs.appendFile(dbPath, JSON.stringify([]), function (err) {
            if (err) throw err;
        });
    }
}

export function LoadDB(): Patient[] {
    let patients = fs.readFileSync(dbPath, { encoding: "utf8", flag: "r" });
    if (patients) return JSON.parse(patients) as Array<Patient>;
    else return [];
}
