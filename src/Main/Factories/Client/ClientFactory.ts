import { LocalClient } from "../../../Infra/Client/LocalClient";

const makeClient = (storeName: string) => new LocalClient();

export default makeClient;
