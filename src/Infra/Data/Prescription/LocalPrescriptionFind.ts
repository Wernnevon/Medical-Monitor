import { Prescription } from "../../Entities";
import { Client, Find } from "../../Interfaces";

class LocalPrescriptionFind implements Find {
  constructor(private readonly client: Client<Prescription>) {}

  async findOne(params: Find.Params): Promise<Prescription> {
    return (await this.client.request({ method: "get", data: params.query }))
      .data;
  }
  async findByQuery(params: Find.Params): Promise<Prescription[]> {
    throw new Error("Method not implemented.");
  }
}

export default LocalPrescriptionFind;
