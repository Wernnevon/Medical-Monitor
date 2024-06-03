import { Store } from "../../Domain/UseCases";
import { Prescription } from "../../Domain/Entities";
import { Client } from "../../Infra/Client/Protocols/resquest";

class LocalPrescriptionStore implements Store {
  constructor(private readonly client: Client<Prescription>) {}

  async store(params: Store.Params): Promise<void> {
    await this.client.request({ method: "post", data: params.data });
  }
}

export default LocalPrescriptionStore;
