import { Patient } from "../../Entities";
import { Client, Update } from "../../Interfaces";

class LocalPatientUpdate implements Update {
  constructor(private readonly client: Client<Patient>) {}

  async update(params: Update.Params): Promise<void> {
    await this.client.request({ method: "put", data: params.data });
  }
}

export default LocalPatientUpdate;
