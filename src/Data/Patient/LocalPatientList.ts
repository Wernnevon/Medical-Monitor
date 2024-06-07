import { List } from "../../Domain/UseCases";
import { Patient } from "../../Domain/Entities";
import { Client } from "../../Infra/Client/Protocols/resquest";

class LocalPatientList implements List {
  constructor(private readonly client: Client<Patient[]>) {}

  async listAll(): Promise<Patient[]> {
    const response = await this.client.request({
      method: "get",
      data: null,
      url: "patient/list",
    });
    return response.data;
  }
  async listPerPage(params: List.Params): Promise<any> {
    const response = await this.client.request({
      method: "get",
      data: params,
      url: "patient/list",
    });
    return response.data;
  }
}

export default LocalPatientList;
