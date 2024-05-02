export interface Store {
  store(params: Store.Params): Promise<void>;
}

export namespace Store {
  export type Params = {
    data: any;
  };
}
