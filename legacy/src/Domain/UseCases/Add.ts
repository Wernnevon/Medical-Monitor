export interface Add {
  store(params: Add.Params): Promise<void>;
}

export namespace Add {
  export type Params<T = any> = {
    data: T;
  };
}
