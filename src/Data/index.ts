//Import Patient Gateways

import LocalPatientList from "./Patient/LocalPatientList";
import LocalPatientStore from "./Patient/LocalPatientStore";
import LocalPatientFind from "./Patient/LocalPatientFind";
import LocalPatientDelete from "./Patient/LocalPatientDelete";
import LocalPatientUpdate from "./Patient/LocalPatientUpdate";

//Import Exams Gateways
import LocalExamsList from "./Exams/LocalExamsList";
import LocalExamsStore from "./Exams/LocalExamsStore";
import LocalExamsFind from "./Exams/LocalExamsFind";
import LocalExamsDelete from "./Exams/LocalExamsDelete";
import LocalExamsUpdate from "./Exams/LocalExamsUpdate";

//Import Prescriptions Gateways
import LocalPrescriptionList from "./Prescription/LocalPrescriptionList";
import LocalPrescriptionStore from "./Prescription/LocalPrescriptionStore";
import LocalPrescriptionFind from "./Prescription/LocalPrescriptionFind";
import LocalPrescriptionDelete from "./Prescription/LocalPrescriptionDelete";
import LocalPrescriptionUpdate from "./Prescription/LocalPrescriptionUpdate";

// NEW IMPORTS GATEWAYS
//PatientS
import { LocalAdd as LocalAddPatient } from "./UseCases/Patients/LocalAdd";
import { LocalDelete as LocalDeletePatient } from "./UseCases/Patients/LocalDelete";
import { LocalUpdate as LocalUpdatePatient } from "./UseCases/Patients/LocalUpdate";
import { LocalFindById as LocalFindByIdPatient } from "./UseCases/Patients/LocalFindById";
import { LocalListPagination as LocalListPaginationPatient } from "./UseCases/Patients/LocalListPagination";
import { LocalListCities } from "./UseCases/Patients/LocalListCities";
import { LocalListInsurance } from "./UseCases/Patients/LocalListInsurance";
//Exams
import { LocalAdd as LocalAddExam } from "./UseCases/Exams/LocalAdd";
import { LocalDelete as LocalDeleteExams } from "./UseCases/Exams/LocalDelete";
import { LocalUpdate as LocalUpdateExams } from "./UseCases/Exams/LocalUpdate";
import { LocalFindById as LocalFindByIdExams } from "./UseCases/Exams/LocalFindById";
import { LocalListPagination as LocalListPaginationExams } from "./UseCases/Exams/LocalListPagination";
import { LocalChangeStatus as LocalChangeStatusExam } from "./UseCases/Exams/LocalChangeStatus";
//Prescriptions
import { LocalAdd as LocalAddPrescriptions } from "./UseCases/Prescriptions/LocalAdd";
import { LocalDelete as LocalDeletePrescriptions } from "./UseCases/Prescriptions/LocalDelete";
import { LocalUpdate as LocalUpdatePrescriptions } from "./UseCases/Prescriptions/LocalUpdate";
import { LocalFindById as LocalFindByIdPrescriptions } from "./UseCases/Prescriptions/LocalFindById";
import { LocalListPagination as LocalListPaginationPrescriptions } from "./UseCases/Prescriptions/LocalListPagination";
import { LocalChangeStatus as LocalChangeStatusExamPrescription } from "./UseCases/Prescriptions/LocalChangeStatus";

// Export all Gateways
export {
  //Patient
  LocalPatientList,
  LocalPatientStore,
  LocalPatientDelete,
  LocalPatientFind,
  LocalPatientUpdate,
  //Exams
  LocalExamsList,
  LocalExamsStore,
  LocalExamsFind,
  LocalExamsDelete,
  LocalExamsUpdate,
  //Prescriptions
  LocalPrescriptionList,
  LocalPrescriptionStore,
  LocalPrescriptionFind,
  LocalPrescriptionDelete,
  LocalPrescriptionUpdate,
  // NEW GATEWAYS
  // Pattients
  LocalAddPatient,
  LocalDeletePatient,
  LocalUpdatePatient,
  LocalFindByIdPatient,
  LocalListCities,
  LocalListInsurance,
  LocalListPaginationPatient,
  // Exams
  LocalAddExam,
  LocalDeleteExams,
  LocalUpdateExams,
  LocalFindByIdExams,
  LocalListPaginationExams,
  LocalChangeStatusExam,
  // Prescriptions
  LocalAddPrescriptions,
  LocalDeletePrescriptions,
  LocalUpdatePrescriptions,
  LocalFindByIdPrescriptions,
  LocalListPaginationPrescriptions,
  LocalChangeStatusExamPrescription,
};
