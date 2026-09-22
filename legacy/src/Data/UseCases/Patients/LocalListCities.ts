import { ListCities } from "../../../Domain/UseCases/ListCities";
import { Client } from "../../../Infra/Client/Protocols/resquest";

export class LocalListCities implements ListCities {
  constructor(private readonly client: Client<ListCities.Reponse>) {}

  async listCities(): Promise<ListCities.Reponse> {
    let response;
    try {
      response = await this.client.request({
        method: "get",
        data: null,
        url: "patient/listCities",
      });
    } catch (error) {
      throw new Error("falha na requisição");
    }
    return Promise.resolve(response);
  }
}
