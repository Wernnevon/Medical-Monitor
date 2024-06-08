import { ChangeStatus } from "../../../Domain/UseCases2/ChangeStatus";
import { Client } from "../../../Infra/Client/Protocols/resquest";

export class LocalChangeStatus implements ChangeStatus {
  constructor(private readonly client: Client<void>) {}

  changeStatus(params: ChangeStatus.Params): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
