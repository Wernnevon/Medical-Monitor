import { Prescription } from "../../Entities";
import { Client, Store } from "../../Interfaces";

class LocalPrescriptionStore implements Store {
  constructor(private readonly client: Client<Prescription>) {}

  async store(params: Store.Params): Promise<void> {
    await this.client.request({ method: "post", data: params.data });
  }
}

export default LocalPrescriptionStore;
