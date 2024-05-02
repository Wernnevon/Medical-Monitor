import { Prescription } from "../../Entities";
import { Client, Update } from "../../Interfaces";

class LocalPrescriptionUpdate implements Update {
  constructor(private readonly client: Client<Prescription>) {}

  async update(params: Update.Params): Promise<void> {
    await this.client.request({ method: "put", data: params.data });
  }
}

export default LocalPrescriptionUpdate;
