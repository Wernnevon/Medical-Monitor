import { Service, inject } from '@angular/core';
import type { Patient } from '@domain/entities';
import {
  PatientAdd,
  PatientDelete,
  PatientFindById,
  PatientListCities,
  PatientListInsurance,
  PatientListPagination,
  PatientUpdate,
  TokenPatientAddReading,
  TokenPatientRemoveReading,
} from '@domain/tokens';
import type {
  Add,
  Delete,
  FindById,
  ListCities,
  ListInsurance,
  ListPagination,
  Update,
  PatientAddReading,
  PatientRemoveReading,
} from '@domain/use-cases';
import { LocalClient } from '@infra/client/local-client';
import { HTTPVerbs } from '@infra/frameworks/http-verbs';
import { failed } from '../failed';

@Service({ autoProvided: false })
export class LocalAddPatient extends PatientAdd {
  private readonly client = inject(LocalClient);

  async store(params: Add.Params<Patient>): Promise<void> {
    try {
      return await this.client.request({
        method: HTTPVerbs.POST,
        data: params.data,
        url: 'patient/save',
      });
    } catch (error) {
      throw failed(error);
    }
  }
}

@Service({ autoProvided: false })
export class LocalUpdatePatient extends PatientUpdate {
  private readonly client = inject(LocalClient);

  async update(params: Update.Params): Promise<void> {
    try {
      return await this.client.request({
        method: HTTPVerbs.PUT,
        data: params.data,
        url: 'patient/update',
      });
    } catch (error) {
      throw failed(error);
    }
  }
}

@Service({ autoProvided: false })
export class LocalFindByIdPatient extends PatientFindById {
  private readonly client = inject(LocalClient);

  async findById(params: FindById.Params): Promise<Patient> {
    try {
      return await this.client.request({
        method: HTTPVerbs.GET,
        data: params.id,
        url: 'patient/findById',
      });
    } catch (error) {
      throw failed(error);
    }
  }
}

@Service({ autoProvided: false })
export class LocalDeletePatient extends PatientDelete {
  private readonly client = inject(LocalClient);

  async delete(params: Delete.Params): Promise<void> {
    try {
      return await this.client.request({
        method: HTTPVerbs.DELETE,
        data: params.ids,
        url: 'patient/delete',
      });
    } catch (error) {
      throw failed(error);
    }
  }
}

@Service({ autoProvided: false })
export class LocalListPaginationPatient extends PatientListPagination {
  private readonly client = inject(LocalClient);

  async listPagination(
    params: ListPagination.Params,
  ): Promise<ListPagination.Response<Patient>> {
    try {
      return await this.client.request({
        method: HTTPVerbs.POST,
        data: params,
        url: 'patient/list',
      });
    } catch (error) {
      throw failed(error);
    }
  }
}

@Service({ autoProvided: false })
export class LocalListCities extends PatientListCities {
  private readonly client = inject(LocalClient);

  async listCities(): Promise<ListCities.Reponse> {
    try {
      return await this.client.request({
        method: HTTPVerbs.GET,
        data: null,
        url: 'patient/listCities',
      });
    } catch (error) {
      throw failed(error);
    }
  }
}

@Service({ autoProvided: false })
export class LocalListInsurance extends PatientListInsurance {
  private readonly client = inject(LocalClient);

  async listInsurance(): Promise<ListInsurance.Reponse> {
    try {
      return await this.client.request({
        method: HTTPVerbs.GET,
        data: null,
        url: 'patient/listInsurances',
      });
    } catch (error) {
      throw failed(error);
    }
  }
}

@Service({ autoProvided: false })
export class LocalAddPatientReading extends TokenPatientAddReading {
  private readonly client = inject(LocalClient);

  async add(params: PatientAddReading.Params): Promise<void> {
    try {
      return await this.client.request({
        method: HTTPVerbs.POST,
        data: params,
        url: 'patient/addReading',
      });
    } catch (error) {
      throw failed(error);
    }
  }
}

@Service({ autoProvided: false })
export class LocalRemovePatientReading extends TokenPatientRemoveReading {
  private readonly client = inject(LocalClient);

  async remove(params: PatientRemoveReading.Params): Promise<void> {
    try {
      return await this.client.request({
        method: HTTPVerbs.DELETE,
        data: params,
        url: 'patient/removeReading',
      });
    } catch (error) {
      throw failed(error);
    }
  }
}
