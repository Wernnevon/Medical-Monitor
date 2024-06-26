export interface FindById<R = any> {
  findById(params: FindById.Params): Promise<R>;
}

export namespace FindById {
  export type Params = {
    id: number;
  };
}
