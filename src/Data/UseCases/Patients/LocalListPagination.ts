import { Patient } from "../../../Domain/Entities";
import { ListPagination } from "../../../Domain/UseCases/ListPagination";
import { Client } from "../../../Infra/Client/Protocols/resquest";
import { HTTPVerbs } from "../../../Infra/Frameworks/HTTPVerbs";

export class LocalListPagination implements ListPagination {
  constructor(
    private readonly client: Client<ListPagination.Response<Patient>>
  ) {}

  async listPagination(
    params: ListPagination.Params
  ): Promise<ListPagination.Response<Patient>> {
    return Promise.resolve(
      await this.client.request({
        method: HTTPVerbs.POST,
        url: "patient/list",
        data: params,
      })
    ).catch((err) => {
      throw new Error(err);
    });
  }
}
