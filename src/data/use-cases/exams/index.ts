import { Service, inject } from '@angular/core';
import type { Exams } from '@domain/entities';
import {
  ExamAdd,
  ExamChangeStatus,
  ExamDelete,
  ExamFindById,
  ExamListPagination,
  ExamUpdate,
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
export class LocalAddExam extends ExamAdd {
  private readonly client = inject(LocalClient);

  async store(params: Add.Params<Exams>): Promise<void> {
    try {
      return await this.client.request({
        method: HTTPVerbs.POST,
        data: params.data,
        url: 'exam/save',
      });
    } catch (error) {
      throw failed(error);
    }
  }
}

@Service({ autoProvided: false })
export class LocalUpdateExam extends ExamUpdate {
  private readonly client = inject(LocalClient);

  async update(params: Update.Params): Promise<void> {
    try {
      return await this.client.request({
        method: HTTPVerbs.PUT,
        data: params.data,
        url: 'exam/update',
      });
    } catch (error) {
      throw failed(error);
    }
  }
}

@Service({ autoProvided: false })
export class LocalFindByIdExam extends ExamFindById {
  private readonly client = inject(LocalClient);

  async findById(params: FindById.Params): Promise<Exams> {
    try {
      return await this.client.request({
        method: HTTPVerbs.GET,
        data: params.id,
        url: 'exam/findById',
      });
    } catch (error) {
      throw failed(error);
    }
  }
}

@Service({ autoProvided: false })
export class LocalDeleteExam extends ExamDelete {
  private readonly client = inject(LocalClient);

  async delete(params: Delete.Params): Promise<void> {
    try {
      return await this.client.request({
        method: HTTPVerbs.DELETE,
        data: params.ids,
        url: 'exam/delete',
      });
    } catch (error) {
      throw failed(error);
    }
  }
}

@Service({ autoProvided: false })
export class LocalListPaginationExam extends ExamListPagination {
  private readonly client = inject(LocalClient);

  async listPagination(
    params: ListPagination.Params,
  ): Promise<ListPagination.Response<Exams>> {
    try {
      return await this.client.request({
        method: HTTPVerbs.POST,
        data: params,
        url: 'exam/list',
      });
    } catch (error) {
      throw failed(error);
    }
  }
}

@Service({ autoProvided: false })
export class LocalChangeStatusExam extends ExamChangeStatus {
  private readonly client = inject(LocalClient);

  async changeStatus(params: ChangeStatus.Params): Promise<void> {
    try {
      return await this.client.request({
        method: HTTPVerbs.PUT,
        data: params.id,
        url: 'exam/changeStatus',
      });
    } catch (error) {
      throw failed(error);
    }
  }
}
