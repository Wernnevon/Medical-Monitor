import { Update } from "../../Domain/UseCases";
import { Patient } from "../../Domain/Entities";
import { Client } from "../../Infra/Client/Protocols/resquest";

class LocalPatientUpdate implements Update {
  constructor(private readonly client: Client<Patient>) {}

  async update(params: Update.Params): Promise<void> {
    await this.client.request({
      method: "put",
      data: params.data,
      url: "patient/update",
    });
  }
}

export default LocalPatientUpdate;
