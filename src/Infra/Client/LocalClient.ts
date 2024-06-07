import {
  deleteStrategies,
  postStrategies,
  putStrategies,
} from "../Controllers";
import { getStrategies } from "../Controllers/get";
import { Client, ClientReq, ClientRes } from "./Protocols/resquest";

export class LocalClient implements Client {
  private readonly controllerStartegy = {
    get: getStrategies,
    post: postStrategies,
    put: putStrategies,
    delete: deleteStrategies,
  };
  async request({ method, url, data }: ClientReq): Promise<ClientRes<any>> {
    return Promise.resolve({
      data: await this.controllerStartegy[method](url, data),
    }).catch((err) => {
      throw new Error(err);
    });
  }
}
