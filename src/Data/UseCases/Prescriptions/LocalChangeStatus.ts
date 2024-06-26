import { ChangeStatus } from "../../../Domain/UseCases/ChangeStatus";
import { Client } from "../../../Infra/Client/Protocols/resquest";
import { HTTPVerbs } from "../../../Infra/Frameworks/HTTPVerbs";

export class LocalChangeStatus implements ChangeStatus {
  constructor(private readonly client: Client<void>) {}

  async changeStatus(params: ChangeStatus.Params): Promise<void> {
    let response;
    try {
      response = await this.client.request({
        method: HTTPVerbs.PUT,
        data: params.id,
        url: "prescription/changeStatus",
      });
    } catch (error) {
      throw new Error("falha na requisição");
    }
    return Promise.resolve(response);
  }
}
