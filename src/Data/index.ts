// IMPORTS GATEWAYS
//PatientS
import { LocalAdd as LocalAddPatient } from "./UseCases/Patients/LocalAdd";
import { LocalDelete as LocalDeletePatient } from "./UseCases/Patients/LocalDelete";
import { LocalUpdate as LocalUpdatePatient } from "./UseCases/Patients/LocalUpdate";
import { LocalFindById as LocalFindByIdPatient } from "./UseCases/Patients/LocalFindById";
import { LocalListPagination as LocalListPaginationPatient } from "./UseCases/Patients/LocalListPagination";
import { LocalListCities } from "./UseCases/Patients/LocalListCities";
import { LocalListInsurance } from "./UseCases/Patients/LocalListInsurance";
//Exams
import { LocalAdd as LocalAddExams } from "./UseCases/Exams/LocalAdd";
import { LocalDelete as LocalDeleteExams } from "./UseCases/Exams/LocalDelete";
import { LocalUpdate as LocalUpdateExams } from "./UseCases/Exams/LocalUpdate";
import { LocalFindById as LocalFindByIdExams } from "./UseCases/Exams/LocalFindById";
import { LocalListPagination as LocalListPaginationExams } from "./UseCases/Exams/LocalListPagination";
import { LocalChangeStatus as LocalChangeStatusExams } from "./UseCases/Exams/LocalChangeStatus";
//Prescriptions
import { LocalAdd as LocalAddPrescriptions } from "./UseCases/Prescriptions/LocalAdd";
import { LocalDelete as LocalDeletePrescriptions } from "./UseCases/Prescriptions/LocalDelete";
import { LocalUpdate as LocalUpdatePrescriptions } from "./UseCases/Prescriptions/LocalUpdate";
import { LocalFindById as LocalFindByIdPrescriptions } from "./UseCases/Prescriptions/LocalFindById";
import { LocalListPagination as LocalListPaginationPrescriptions } from "./UseCases/Prescriptions/LocalListPagination";
import { LocalChangeStatus as LocalChangeStatusExamPrescription } from "./UseCases/Prescriptions/LocalChangeStatus";

// Export all Gateways
export {
  // Pattients
  LocalAddPatient,
  LocalDeletePatient,
  LocalUpdatePatient,
  LocalFindByIdPatient,
  LocalListCities,
  LocalListInsurance,
  LocalListPaginationPatient,
  // Exams
  LocalAddExams,
  LocalDeleteExams,
  LocalUpdateExams,
  LocalFindByIdExams,
  LocalListPaginationExams,
  LocalChangeStatusExams,
  // Prescriptions
  LocalAddPrescriptions,
  LocalDeletePrescriptions,
  LocalUpdatePrescriptions,
  LocalFindByIdPrescriptions,
  LocalListPaginationPrescriptions,
  LocalChangeStatusExamPrescription,
};
