import { Exams } from "../../../Domain/Entities";
import { ListPagination } from "../../../Domain/UseCases/ListPagination";
import { Client } from "../../../Infra/Client/Protocols/resquest";
import { HTTPVerbs } from "../../../Infra/Frameworks/HTTPVerbs";

export class LocalListPagination implements ListPagination {
  constructor(
    private readonly client: Client<ListPagination.Response<Exams>>
  ) {}

  async listPagination(
    params: ListPagination.Params
  ): Promise<ListPagination.Response<Exams>> {
    let response;
    try {
      response = await this.client.request({
        method: HTTPVerbs.POST,
        url: "exam/list",
        data: params,
      });
    } catch (err) {
      throw new Error("falha na requisição");
    }

    return Promise.resolve(response);
  }
}
