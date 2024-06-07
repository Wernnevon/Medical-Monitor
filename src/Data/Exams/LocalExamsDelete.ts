import { Delete } from "../../Domain/UseCases";
import { Exams } from "../../Domain/Entities";
import { Client } from "../../Infra/Client/Protocols/resquest";

class LocalExamsDelete implements Delete {
  constructor(private readonly client: Client<Exams>) {}

  async delete(params: Delete.Params): Promise<void> {
    await this.client.request({
      method: "delete",
      data: params.id,
      url: "exam/delete",
    });
  }

  async deleteMultiple(params: Delete.Params): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export default LocalExamsDelete;
