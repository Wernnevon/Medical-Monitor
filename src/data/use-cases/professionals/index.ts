import { Service, inject } from '@angular/core';
import type { Professional } from '@domain/entities';
import {
  ProfessionalAdd,
  ProfessionalFindById,
  ProfessionalFindByUsername,
} from '@domain/tokens';
import type { Add, FindById, FindByUsername } from '@domain/use-cases';
import { LocalClient } from '@infra/client/local-client';
import { HTTPVerbs } from '@infra/frameworks/http-verbs';
import { failed } from '../failed';

@Service({ autoProvided: false })
export class LocalAddProfessional extends ProfessionalAdd {
  private readonly client = inject(LocalClient);

  async store(params: Add.Params<Professional>): Promise<void> {
    try {
      return await this.client.request({
        method: HTTPVerbs.POST,
        data: params.data,
        url: 'professional/save',
      });
    } catch (error) {
      throw failed(error);
    }
  }
}

@Service({ autoProvided: false })
export class LocalFindByIdProfessional extends ProfessionalFindById {
  private readonly client = inject(LocalClient);

  async findById(params: FindById.Params): Promise<Professional> {
    try {
      return await this.client.request({
        method: HTTPVerbs.GET,
        data: params.id,
        url: 'professional/findById',
      });
    } catch (error) {
      throw failed(error);
    }
  }
}

@Service({ autoProvided: false })
export class LocalFindByUsernameProfessional extends ProfessionalFindByUsername {
  private readonly client = inject(LocalClient);

  async findByUsername(params: FindByUsername.Params): Promise<Professional | null> {
    try {
      return await this.client.request({
        method: HTTPVerbs.GET,
        data: params.username,
        url: 'professional/findByUsername',
      });
    } catch (error) {
      throw failed(error);
    }
  }
}
