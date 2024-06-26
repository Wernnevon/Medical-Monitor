import {
  LocalAddExams,
  LocalDeleteExams,
  LocalUpdateExams,
  LocalFindByIdExams,
  LocalListPaginationExams,
} from "../../../Data";
import { LocalChangeStatus } from "../../../Data/UseCases/Exams/LocalChangeStatus";

import makeClient from "../Client/ClientFactory";

const examsClient = makeClient("exams");
// NEW FACTORIES

function makeExamsAdd() {
  return new LocalAddExams(examsClient);
}

function makeExamsUpdate() {
  return new LocalUpdateExams(examsClient);
}

function makeExamsFindById() {
  return new LocalFindByIdExams(examsClient);
}

function makeExamsDelete() {
  return new LocalDeleteExams(examsClient);
}

function makeExamsListPagination() {
  return new LocalListPaginationExams(examsClient);
}

function makeExamsChangeStatus() {
  return new LocalChangeStatus(examsClient);
}

export {
  // NEW FACTORIES
  makeExamsListPagination,
  makeExamsDelete,
  makeExamsAdd,
  makeExamsUpdate,
  makeExamsFindById,
  makeExamsChangeStatus,
};
