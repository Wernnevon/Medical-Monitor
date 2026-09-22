import { Add } from "../../../Domain/UseCases/Add";
import { Client } from "../../../Infra/Client/Protocols/resquest";
import { HTTPVerbs } from "../../../Infra/Frameworks/HTTPVerbs";

export class LocalAdd implements Add {
  constructor(private readonly client: Client<void>) {}

  async store(params: Add.Params) {
    let response;
    try {
      response = await this.client.request({
        method: HTTPVerbs.POST,
        data: params.data,
        url: "patient/save",
      });
    } catch (error) {
      throw new Error("falha na requisição");
    }
    return Promise.resolve(response);
  }
}
