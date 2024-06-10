import {
  LocalAddExams,
  LocalDeleteExams,
  LocalUpdateExams,
  LocalFindByIdExams,
  LocalListPaginationExams,
} from "../../../Data";

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

export {
  // NEW FACTORIES
  makeExamsListPagination,
  makeExamsDelete,
  makeExamsAdd,
  makeExamsUpdate,
  makeExamsFindById,
};
