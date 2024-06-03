import { Store } from "../../Domain/UseCases";
import { Patient } from "../../Domain/Entities";
import { Client } from "../../Infra/Client/Protocols/resquest";

class LocalPatientStore implements Store {
  constructor(private readonly client: Client<Patient>) {}

  async store(params: Store.Params): Promise<void> {
    await this.client.request({ method: "post", data: params.data });
  }
}

export default LocalPatientStore;
