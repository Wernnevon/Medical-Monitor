import type { Patient } from '../entities';
import type {
  Add,
  Delete,
  FindById,
  ListCities,
  ListInsurance,
  ListPagination,
  Update,
} from '../use-cases';

/**
 * Tokens de injeção do agregado Paciente.
 *
 * Os contratos em `domain/use-cases` são genéricos (`Add`, `Delete`, ...) e
 * reaproveitados pelas três entidades, então não servem como token de DI:
 * um mesmo `Add` teria três implementações concorrentes. Estas classes
 * abstratas amarram contrato + entidade, dando um token único por operação.
 *
 * São classes abstratas, e não `InjectionToken`, de propósito: assim o domínio
 * continua TypeScript puro, sem importar `@angular/core`. O custo em bundle é
 * um construtor vazio, e a implementação concreta (em `data/`) só é retida
 * onde for de fato provida.
 */

export abstract class PatientAdd implements Add {
  abstract store(params: Add.Params<Patient>): Promise<void>;
}

export abstract class PatientUpdate implements Update {
  abstract update(params: Update.Params): Promise<void>;
}

export abstract class PatientFindById implements FindById<Patient> {
  abstract findById(params: FindById.Params): Promise<Patient>;
}

export abstract class PatientDelete implements Delete {
  abstract delete(params: Delete.Params): Promise<void>;
}

export abstract class PatientListPagination implements ListPagination<Patient> {
  abstract listPagination(
    params: ListPagination.Params,
  ): Promise<ListPagination.Response<Patient>>;
}

export abstract class PatientListCities implements ListCities {
  abstract listCities(): Promise<ListCities.Reponse>;
}

export abstract class PatientListInsurance implements ListInsurance {
  abstract listInsurance(): Promise<ListInsurance.Reponse>;
}
