import {
  LocalExamsStore,
  LocalExamsUpdate,
  LocalExamsDelete,
  LocalExamsFind,
  LocalExamsList,
} from "../Data";

import makeClient from "./ClientFactory";

const examClient = makeClient("exams");

const makeLocalExamStore = () => new LocalExamsStore(examClient);

const makeLocalExamUpdate = () => new LocalExamsUpdate(examClient);

const makeLocalExamDelete = () => new LocalExamsDelete(examClient);

const makeLocalExamFind = () => new LocalExamsFind(examClient);

const makeLocalExamList = () => new LocalExamsList(examClient);

export {
  makeLocalExamStore,
  makeLocalExamUpdate,
  makeLocalExamDelete,
  makeLocalExamFind,
  makeLocalExamList,
};
