export interface ListInsurance {
  listInsurance(): Promise<ListInsurance.Reponse>;
}

export namespace ListInsurance {
  export type Reponse = string[];
}
