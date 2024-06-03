import { Exams } from "../../Domain/Entities";
import { Client } from "../../Infra/Client/Protocols/resquest";
import { Update } from "../../Domain/UseCases";

class LocalExamsUpdate implements Update {
  constructor(private readonly client: Client<Exams>) {}

  async update(params: Update.Params): Promise<void> {
    await this.client.request({ method: "put", data: params.data });
  }
}

export default LocalExamsUpdate;
