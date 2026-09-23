import type { Provider } from '@angular/core';
import {
  LocalAddExam,
  LocalChangeStatusExam,
  LocalDeleteExam,
  LocalFindByIdExam,
  LocalListPaginationExam,
  LocalUpdateExam,
} from '@data/use-cases/exams';
import {
  LocalAddPatient,
  LocalDeletePatient,
  LocalFindByIdPatient,
  LocalListCities,
  LocalListInsurance,
  LocalListPaginationPatient,
  LocalUpdatePatient,
} from '@data/use-cases/patients';
import {
  LocalAddPrescription,
  LocalChangeStatusPrescription,
  LocalDeletePrescription,
  LocalFindByIdPrescription,
  LocalListPaginationPrescription,
  LocalUpdatePrescription,
} from '@data/use-cases/prescriptions';
import {
  LocalAddProfessional,
  LocalFindByIdProfessional,
  LocalFindByUsernameProfessional,
} from '@data/use-cases/professionals';
import {
  ExamAdd,
  ExamChangeStatus,
  ExamDelete,
  ExamFindById,
  ExamListPagination,
  ExamUpdate,
  PatientAdd,
  PatientDelete,
  PatientFindById,
  PatientListCities,
  PatientListInsurance,
  PatientListPagination,
  PatientUpdate,
  PrescriptionAdd,
  PrescriptionChangeStatus,
  PrescriptionDelete,
  PrescriptionFindById,
  PrescriptionListPagination,
  PrescriptionUpdate,
  ProfessionalAdd,
  ProfessionalFindById,
  ProfessionalFindByUsername,
} from '@domain/tokens';

/**
 * Liga cada contrato do domínio à sua implementação.
 *
 * Este arquivo substitui todo o `Main/Factories/` do projeto React — um
 * contêiner de injeção escrito à mão. As factories de página desapareceram:
 * no Angular o componente resolve as próprias dependências com `inject()`.
 *
 * É também o único ponto a mudar quando a persistência remota entrar: um
 * `useClass` apontando para o adaptador do BaaS troca a implementação sem
 * tocar em caso de uso nem em tela.
 */
export const dataProviders: Provider[] = [
  // Pacientes
  { provide: PatientAdd, useClass: LocalAddPatient },
  { provide: PatientUpdate, useClass: LocalUpdatePatient },
  { provide: PatientFindById, useClass: LocalFindByIdPatient },
  { provide: PatientDelete, useClass: LocalDeletePatient },
  { provide: PatientListPagination, useClass: LocalListPaginationPatient },
  { provide: PatientListCities, useClass: LocalListCities },
  { provide: PatientListInsurance, useClass: LocalListInsurance },

  // Exames
  { provide: ExamAdd, useClass: LocalAddExam },
  { provide: ExamUpdate, useClass: LocalUpdateExam },
  { provide: ExamFindById, useClass: LocalFindByIdExam },
  { provide: ExamDelete, useClass: LocalDeleteExam },
  { provide: ExamListPagination, useClass: LocalListPaginationExam },
  { provide: ExamChangeStatus, useClass: LocalChangeStatusExam },

  // Prescrições
  { provide: PrescriptionAdd, useClass: LocalAddPrescription },
  { provide: PrescriptionUpdate, useClass: LocalUpdatePrescription },
  { provide: PrescriptionFindById, useClass: LocalFindByIdPrescription },
  { provide: PrescriptionDelete, useClass: LocalDeletePrescription },
  {
    provide: PrescriptionListPagination,
    useClass: LocalListPaginationPrescription,
  },
  { provide: PrescriptionChangeStatus, useClass: LocalChangeStatusPrescription },

  // Profissionais (contas de acesso)
  { provide: ProfessionalAdd, useClass: LocalAddProfessional },
  { provide: ProfessionalFindById, useClass: LocalFindByIdProfessional },
  { provide: ProfessionalFindByUsername, useClass: LocalFindByUsernameProfessional },
];
