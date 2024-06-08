import { Update } from "../../../Domain/UseCases2/Update";
import { Client } from "../../../Infra/Client/Protocols/resquest";
import { HTTPVerbs } from "../../../Infra/Frameworks/HTTPVerbs";

export class LocalUpdate implements Update {
  constructor(private readonly client: Client<void>) {}

  async update(params: Update.Params): Promise<void> {
    let response;
    try {
      response = await this.client.request({
        method: HTTPVerbs.PUT,
        data: params.data,
        url: "exam/update",
      });
    } catch (error) {
      throw new Error("falha na requisição");
    }
    return Promise.resolve(response);
  }
}
