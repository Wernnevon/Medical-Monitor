import { Patient } from "../../Entities";
import { Client, Delete } from "../../Interfaces";

class LocalPatientDelete implements Delete {
  constructor(private readonly client: Client<Patient>) {}

  async delete(params: Delete.Params): Promise<void> {
    await this.client.request({ method: "delete", data: params.id });
  }

  async deleteMultiple(params: Delete.Params): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export default LocalPatientDelete;
