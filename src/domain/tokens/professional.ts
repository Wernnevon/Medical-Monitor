import type { Professional } from '../entities';
import type { Add, FindById, FindByUsername } from '../use-cases';

/** Ver nota em `patient.ts` sobre classes abstratas como token de DI. */

export abstract class ProfessionalAdd implements Add {
  abstract store(params: Add.Params<Professional>): Promise<void>;
}

export abstract class ProfessionalFindById implements FindById<Professional> {
  abstract findById(params: FindById.Params): Promise<Professional>;
}

export abstract class ProfessionalFindByUsername implements FindByUsername<Professional> {
  abstract findByUsername(params: FindByUsername.Params): Promise<Professional | null>;
}
