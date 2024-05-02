import { Patient } from "../../Entities";
import { Client, Store } from "../../Interfaces";

class LocalPatientStore implements Store {
  constructor(private readonly client: Client<Patient>) {}

  async store(params: Store.Params): Promise<void> {
    await this.client.request({ method: "post", data: params.data });
  }
}

export default LocalPatientStore;
