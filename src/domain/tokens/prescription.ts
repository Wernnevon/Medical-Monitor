import type { Prescription } from '../entities';
import type {
  Add,
  ChangeStatus,
  Delete,
  FindById,
  ListPagination,
  Update,
} from '../use-cases';

/** Tokens de injeção do agregado Prescrição. Ver `patient.ts` para o racional. */

export abstract class PrescriptionAdd implements Add {
  abstract store(params: Add.Params<Prescription>): Promise<void>;
}

export abstract class PrescriptionUpdate implements Update {
  abstract update(params: Update.Params): Promise<void>;
}

export abstract class PrescriptionFindById implements FindById<Prescription> {
  abstract findById(params: FindById.Params): Promise<Prescription>;
}

export abstract class PrescriptionDelete implements Delete {
  abstract delete(params: Delete.Params): Promise<void>;
}

export abstract class PrescriptionListPagination
  implements ListPagination<Prescription>
{
  abstract listPagination(
    params: ListPagination.Params,
  ): Promise<ListPagination.Response<Prescription>>;
}

export abstract class PrescriptionChangeStatus implements ChangeStatus {
  abstract changeStatus(params: ChangeStatus.Params): Promise<void>;
}
