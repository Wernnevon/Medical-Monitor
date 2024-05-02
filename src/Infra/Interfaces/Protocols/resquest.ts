export type ClientReq = {
  method: Method;
  data: any;
};

export type ClientRes<T = any> = {
  data: T;
};

export type Method = "post" | "get" | "put" | "delete";

export interface Client<R = any> {
  request(data: ClientReq): Promise<ClientRes<R>>;
}
