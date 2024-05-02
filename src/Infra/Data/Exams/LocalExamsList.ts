import { Exams } from "../../Entities";
import { Client, List } from "../../Interfaces";

class LocalExamsList implements List {
  constructor(private readonly client: Client<Exams[]>) {}

  async listAll(): Promise<Exams[]> {
    const response = await this.client.request({ method: "get", data: null });
    return response.data;
  }
  async listPerPage(params: List.Params): Promise<Exams[]> {
    const response = await this.client.request({ method: "get", data: null });
    return response.data;
  }
}

export default LocalExamsList;
