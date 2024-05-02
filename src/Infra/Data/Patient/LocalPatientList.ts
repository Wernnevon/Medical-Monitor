import { Patient } from "../../Entities";
import { Client, List } from "../../Interfaces";

class LocalPatientList implements List {
  constructor(private readonly client: Client<Patient[]>) {}

  async listAll(): Promise<Patient[]> {
    const response = await this.client.request({ method: "get", data: null });
    return response.data;
  }
  async listPerPage(params: List.Params): Promise<any> {
    const response = await this.client.request({ method: "get", data: params });
    return response.data;
  }
}

export default LocalPatientList;
