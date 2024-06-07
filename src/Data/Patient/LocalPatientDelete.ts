import { Delete } from "../../Domain/UseCases";
import { Patient } from "../../Domain/Entities";
import { Client } from "../../Infra/Client/Protocols/resquest";

class LocalPatientDelete implements Delete {
  constructor(private readonly client: Client<Patient>) {}

  async delete(params: Delete.Params): Promise<void> {
    await this.client.request({
      method: "delete",
      data: params.id,
      url: "patient/delete",
    });
  }

  async deleteMultiple(params: Delete.Params): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export default LocalPatientDelete;
