export interface Update {
  update(params: Update.Params): Promise<void>;
}

export namespace Update {
  export type Params = {
    data: any;
  };
}
