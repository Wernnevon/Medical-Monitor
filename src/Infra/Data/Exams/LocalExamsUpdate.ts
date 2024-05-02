import { Exams } from "../../Entities";
import { Client, Update } from "../../Interfaces";

class LocalExamsUpdate implements Update {
  constructor(private readonly client: Client<Exams>) {}

  async update(params: Update.Params): Promise<void> {
    await this.client.request({ method: "put", data: params.data });
  }
}

export default LocalExamsUpdate;
