import {
  makeLocalExamStore,
  makeLocalExamUpdate,
  makeLocalExamDelete,
  makeLocalExamFind,
  makeLocalExamList,
} from "./ExameFactory";

import {
  makeLocalPatientStore,
  makeLocalPatientUpdate,
  makeLocalPatientDelete,
  makeLocalPatientFind,
  makeLocalPatientList,
} from "./PatientFactory";

import {
  makeLocalPrescriptionStore,
  makeLocalPrescriptionUpdate,
  makeLocalPrescriptionDelete,
  makeLocalPrescriptionFind,
  makeLocalPrescriptionList,
} from "./PrescriptionFactory";

// factory design pattern
export {
  //exam factory
  makeLocalExamStore,
  makeLocalExamUpdate,
  makeLocalExamDelete,
  makeLocalExamFind,
  makeLocalExamList,
  //patient factory
  makeLocalPatientStore,
  makeLocalPatientUpdate,
  makeLocalPatientDelete,
  makeLocalPatientFind,
  makeLocalPatientList,
  //prescription factory
  makeLocalPrescriptionStore,
  makeLocalPrescriptionUpdate,
  makeLocalPrescriptionDelete,
  makeLocalPrescriptionFind,
  makeLocalPrescriptionList,
};
