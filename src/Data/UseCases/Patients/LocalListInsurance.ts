import { ListInsurance } from "../../../Domain/UseCases2/ListInsurances";
import { Client } from "../../../Infra/Client/Protocols/resquest";

export class LocalListInsurance implements ListInsurance {
  constructor(private readonly client: Client<ListInsurance.Reponse>) {}

  async listInsurance(): Promise<ListInsurance.Reponse> {
    let response;
    try {
      response = await this.client.request({
        method: "get",
        data: null,
        url: "patient/listInsurances",
      });
    } catch (error) {
      throw new Error("falha na requisição");
    }
    return Promise.resolve(response);
  }
}
