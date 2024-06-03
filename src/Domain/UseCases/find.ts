export interface Find<R = any> {
  findOne(params: Find.Params): Promise<R>;
  findByQuery(params: Find.Params): Promise<R[]>;
}

export namespace Find {
  export type Params = {
    query: any;
  };
}
