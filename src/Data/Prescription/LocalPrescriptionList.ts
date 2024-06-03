import { List } from "../../Domain/UseCases";
import { Prescription } from "../../Domain/Entities";
import { Client } from "../../Infra/Client/Protocols/resquest";

class LocalPrescriptionList implements List {
  constructor(private readonly client: Client<Prescription[]>) {}

  async listAll(): Promise<Prescription[]> {
    const response = await this.client.request({ method: "get", data: null });
    return response.data;
  }
  async listPerPage(params: List.Params): Promise<any> {
    const response = await this.client.request({ method: "get", data: params });
    return response.data;
  }
}

export default LocalPrescriptionList;
