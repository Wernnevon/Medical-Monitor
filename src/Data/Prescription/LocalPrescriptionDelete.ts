import { Delete } from "../../Domain/UseCases";
import { Prescription } from "../../Domain/Entities";
import { Client } from "../../Infra/Client/Protocols/resquest";

class LocalPrescriptionDelete implements Delete {
  constructor(private readonly client: Client<Prescription>) {}

  async delete(params: Delete.Params): Promise<void> {
    await this.client.request({ method: "delete", data: params.id });
  }

  async deleteMultiple(params: Delete.Params): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export default LocalPrescriptionDelete;
