import { Delete } from "../../../Domain/UseCases2/Delete";
import { Client } from "../../../Infra/Client/Protocols/resquest";
import { HTTPVerbs } from "../../../Infra/Frameworks/HTTPVerbs";

export class LocalDelete implements Delete {
  constructor(private readonly client: Client<void>) {}

  async delete(params: Delete.Params): Promise<void> {
    let response;
    try {
      response = await this.client.request({
        method: HTTPVerbs.DELETE,
        data: params.ids,
        url: "exam/delete",
      });
    } catch (error) {
      throw new Error("falha na requisição");
    }
    return Promise.resolve(response);
  }
}
