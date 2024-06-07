import { Exams } from "../../Domain/Entities";
import { Find } from "../../Domain/UseCases";
import { Client } from "../../Infra/Client/Protocols/resquest";

class LocalExamsFind implements Find {
  constructor(private readonly client: Client<Exams>) {}

  async findOne(params: Find.Params): Promise<Exams> {
    return (
      await this.client.request({
        method: "get",
        data: params.query,
        url: "exam/findById",
      })
    ).data;
  }
  async findByQuery(params: Find.Params): Promise<Exams[]> {
    throw new Error("Method not implemented.");
  }
}

export default LocalExamsFind;
