export interface Delete {
  delete(params: Delete.Params): Promise<void>;
}

export namespace Delete {
  export type Params = {
    ids: number[];
  };
}
