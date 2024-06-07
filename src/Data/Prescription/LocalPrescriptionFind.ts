import { Find } from "../../Domain/UseCases";
import { Prescription } from "../../Domain/Entities";
import { Client } from "../../Infra/Client/Protocols/resquest";

class LocalPrescriptionFind implements Find {
  constructor(private readonly client: Client<Prescription>) {}

  async findOne(params: Find.Params): Promise<Prescription> {
    return (
      await this.client.request({
        method: "get",
        data: params.query,
        url: "precription/findById",
      })
    ).data;
  }
  async findByQuery(params: Find.Params): Promise<Prescription[]> {
    throw new Error("Method not implemented.");
  }
}

export default LocalPrescriptionFind;
