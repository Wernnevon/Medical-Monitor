import type { Exams } from '../entities';
import type {
  Add,
  ChangeStatus,
  Delete,
  FindById,
  ListPagination,
  Update,
} from '../use-cases';

/** Tokens de injeção do agregado Exame. Ver `patient.ts` para o racional. */

export abstract class ExamAdd implements Add {
  abstract store(params: Add.Params<Exams>): Promise<void>;
}

export abstract class ExamUpdate implements Update {
  abstract update(params: Update.Params): Promise<void>;
}

export abstract class ExamFindById implements FindById<Exams> {
  abstract findById(params: FindById.Params): Promise<Exams>;
}

export abstract class ExamDelete implements Delete {
  abstract delete(params: Delete.Params): Promise<void>;
}

export abstract class ExamListPagination implements ListPagination<Exams> {
  abstract listPagination(
    params: ListPagination.Params,
  ): Promise<ListPagination.Response<Exams>>;
}

export abstract class ExamChangeStatus implements ChangeStatus {
  abstract changeStatus(params: ChangeStatus.Params): Promise<void>;
}
