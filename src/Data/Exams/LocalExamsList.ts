import { Exams } from "../../Domain/Entities";
import { List } from "../../Domain/UseCases";
import { Client } from "../../Infra/Client/Protocols/resquest";

class LocalExamsList implements List {
  constructor(private readonly client: Client<Exams[]>) {}

  async listAll(): Promise<Exams[]> {
    const response = await this.client.request({ method: "get", data: null });
    return response.data;
  }
  async listPerPage(params: List.Params): Promise<any> {
    const response = await this.client.request({ method: "get", data: params });
    return response.data;
  }
}

export default LocalExamsList;
