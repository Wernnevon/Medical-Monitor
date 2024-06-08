export type ClientReq = {
  method: Method;
  data: any | null;
  url: Url;
};

export type ClientRes<T = any> = T;

export type Method = "post" | "get" | "put" | "delete";
export type Url =
  // Get Routes
  | "patient/list"
  | "patient/findById"
  | "patient/listCities"
  | "patient/listInsurances"
  | "exam/list"
  | "exam/findById"
  | "prescription/list"
  | "prescription/findById"
  // Post Routes
  | "patient/list"
  | "patient/save"
  | "exam/list"
  | "exam/save"
  | "prescription/list"
  | "prescription/save"
  // Put Routes
  | "patient/update"
  | "exam/update"
  | "exam/changeStatus"
  | "prescription/update"
  | "prescription/changeStatus"
  // Delete Routes
  | "patient/delete"
  | "exam/delete"
  | "prescription/delete";

export interface Client<R = any> {
  request(data: ClientReq): Promise<ClientRes<R>>;
}
