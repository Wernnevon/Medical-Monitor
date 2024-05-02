import { Exams } from "../../Entities";
import { Client, Delete } from "../../Interfaces";

class LocalExamsDelete implements Delete {
  constructor(private readonly client: Client<Exams>) {}

  async delete(params: Delete.Params): Promise<void> {
    await this.client.request({ method: "delete", data: params.id });
  }

  async deleteMultiple(params: Delete.Params): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export default LocalExamsDelete;
