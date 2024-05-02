import { Patient } from "../../Entities";
import { Client, Find } from "../../Interfaces";

class LocalPatientFind implements Find {
  constructor(private readonly client: Client<Patient>) {}

  async findOne(params: Find.Params): Promise<Patient> {
    return (await this.client.request({ method: "get", data: params.query }))
      .data;
  }
  findByQuery(params: Find.Params): Promise<Patient[]> {
    throw new Error("Method not implemented.");
  }
}

export default LocalPatientFind;
