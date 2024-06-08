import { IndexedDBClient } from "../../Infra/Client";

const makeClient = (storeName: string) =>
  new IndexedDBClient({ dbName: "mmdb", dbVersion: 1, storeName });

export default makeClient;
