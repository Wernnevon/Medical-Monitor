export interface Delete {
  delete(params: Delete.Params): Promise<void>;
  deleteMultiple(params: Delete.Params): Promise<void>;
}

export namespace Delete {
  export type Params = {
    id?: number;
    ids?: number[];
  };
}
