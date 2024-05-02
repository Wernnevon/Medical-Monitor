import { Prescription } from "../../Entities";
import { Client, List } from "../../Interfaces";

class LocalPrescriptionList implements List {
  constructor(private readonly client: Client<Prescription[]>) {}

  async listAll(): Promise<Prescription[]> {
    const response = await this.client.request({ method: "get", data: null });
    return response.data;
  }
  async listPerPage(params: List.Params): Promise<Prescription[]> {
    const response = await this.client.request({ method: "get", data: null });
    return response.data;
  }
}

export default LocalPrescriptionList;
