import { Update } from "../../Domain/UseCases";
import { Prescription } from "../../Domain/Entities";
import { Client } from "../../Infra/Client/Protocols/resquest";

class LocalPrescriptionUpdate implements Update {
  constructor(private readonly client: Client<Prescription>) {}

  async update(params: Update.Params): Promise<void> {
    await this.client.request({ method: "put", data: params.data });
  }
}

export default LocalPrescriptionUpdate;
