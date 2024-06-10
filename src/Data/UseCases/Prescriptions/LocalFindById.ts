import { Prescription } from "../../../Domain/Entities";
import { FindById } from "../../../Domain/UseCases/FindById";
import { Client } from "../../../Infra/Client/Protocols/resquest";
import { HTTPVerbs } from "../../../Infra/Frameworks/HTTPVerbs";

export class LocalFindById implements FindById {
  constructor(private readonly client: Client<Prescription>) {}

  async findById(params: FindById.Params): Promise<Prescription> {
    let response;
    try {
      response = await this.client.request({
        method: HTTPVerbs.GET,
        data: params.id,
        url: "prescription/findById",
      });
    } catch (error) {
      throw new Error("falha na requisição");
    }
    return response;
  }
}
