import { Patient } from "../../../Domain/Entities";
import { ListPagination } from "../../../Domain/UseCases2/ListPagination";
import { Client } from "../../../Infra/Client/Protocols/resquest";
import { HTTPVerbs } from "../../../Infra/Frameworks/HTTPVerbs";

type Response = Patient[];
export class LocalListPagination implements ListPagination {
  constructor(private readonly client: Client<Response>) {}

  async listPagination(params: ListPagination.Params): Promise<Response> {
    let response;
    try {
      response = await this.client.request({
        method: HTTPVerbs.POST,
        url: "patient/list",
        data: params,
      });
    } catch (err) {
      throw new Error("falha na requisição");
    }

    return Promise.resolve(response);
  }
}
