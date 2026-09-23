export interface FindByUsername<R = any> {
  findByUsername(params: FindByUsername.Params): Promise<R | null>;
}

export namespace FindByUsername {
  export type Params = {
    username: string;
  };
}
