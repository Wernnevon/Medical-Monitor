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
};
