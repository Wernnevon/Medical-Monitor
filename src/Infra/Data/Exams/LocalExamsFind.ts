import { Exams } from "../../Entities";
import { Client, Find } from "../../Interfaces";

class LocalExamsFind implements Find {
  constructor(private readonly client: Client<Exams>) {}

  async findOne(params: Find.Params): Promise<Exams> {
    return (await this.client.request({ method: "get", data: params.query }))
      .data;
  }
  async findByQuery(params: Find.Params): Promise<Exams[]> {
    throw new Error("Method not implemented.");
  }
}

export default LocalExamsFind;
