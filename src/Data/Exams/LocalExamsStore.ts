import { Exams } from "../../Domain/Entities";
import { Store } from "../../Domain/UseCases";
import { Client } from "../../Infra/Client/Protocols/resquest";

class LocalExamsStore implements Store {
  constructor(private readonly client: Client<Exams>) {}

  async store(params: Store.Params): Promise<void> {
    await this.client.request({ method: "post", data: params.data });
  }
}

export default LocalExamsStore;
