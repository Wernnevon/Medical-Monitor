import { Service, inject } from '@angular/core';
import type { Prescription } from '@domain/entities';
import {
  PrescriptionAdd,
  PrescriptionChangeStatus,
  PrescriptionDelete,
  PrescriptionFindById,
  PrescriptionListPagination,
  PrescriptionUpdate,
} from '@domain/tokens';
import type {
  Add,
  ChangeStatus,
  Delete,
  FindById,
  ListPagination,
  Update,
} from '@domain/use-cases';
import { LocalClient } from '@infra/client/local-client';
import { HTTPVerbs } from '@infra/frameworks/http-verbs';
import { failed } from '../failed';

@Service({ autoProvided: false })
export class LocalAddPrescription extends PrescriptionAdd {
  private readonly client = inject(LocalClient);

  async store(params: Add.Params<Prescription>): Promise<void> {
    try {
      return await this.client.request({
        method: HTTPVerbs.POST,
        data: params.data,
        url: 'prescription/save',
      });
    } catch (error) {
      throw failed(error);
    }
  }
}

@Service({ autoProvided: false })
export class LocalUpdatePrescription extends PrescriptionUpdate {
  private readonly client = inject(LocalClient);

  async update(params: Update.Params): Promise<void> {
    try {
      return await this.client.request({
        method: HTTPVerbs.PUT,
        data: params.data,
        url: 'prescription/update',
      });
    } catch (error) {
      throw failed(error);
    }
  }
}

@Service({ autoProvided: false })
export class LocalFindByIdPrescription extends PrescriptionFindById {
  private readonly client = inject(LocalClient);

  async findById(params: FindById.Params): Promise<Prescription> {
    try {
      return await this.client.request({
        method: HTTPVerbs.GET,
        data: params.id,
        url: 'prescription/findById',
      });
    } catch (error) {
      throw failed(error);
    }
  }
}

@Service({ autoProvided: false })
export class LocalDeletePrescription extends PrescriptionDelete {
  private readonly client = inject(LocalClient);

  async delete(params: Delete.Params): Promise<void> {
    try {
      return await this.client.request({
        method: HTTPVerbs.DELETE,
        data: params.ids,
        url: 'prescription/delete',
      });
    } catch (error) {
      throw failed(error);
    }
  }
}

@Service({ autoProvided: false })
export class LocalListPaginationPrescription extends PrescriptionListPagination {
  private readonly client = inject(LocalClient);

  async listPagination(
    params: ListPagination.Params,
  ): Promise<ListPagination.Response<Prescription>> {
    try {
      return await this.client.request({
        method: HTTPVerbs.POST,
        data: params,
        url: 'prescription/list',
      });
    } catch (error) {
      throw failed(error);
    }
  }
}

@Service({ autoProvided: false })
export class LocalChangeStatusPrescription extends PrescriptionChangeStatus {
  private readonly client = inject(LocalClient);

  async changeStatus(params: ChangeStatus.Params): Promise<void> {
    try {
      return await this.client.request({
        method: HTTPVerbs.PUT,
        data: params.id,
        url: 'prescription/changeStatus',
      });
    } catch (error) {
      throw failed(error);
    }
  }
}
