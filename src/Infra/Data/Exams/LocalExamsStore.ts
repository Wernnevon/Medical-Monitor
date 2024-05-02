import { Exams } from "../../Entities";
import { Client, Store } from "../../Interfaces";

class LocalExamsStore implements Store {
  constructor(private readonly client: Client<Exams>) {}

  async store(params: Store.Params): Promise<void> {
    await this.client.request({ method: "post", data: params.data });
  }
}

export default LocalExamsStore;
