export interface List<R = any> {
  listAll(): Promise<R>;
  listPerPage(params: List.Params): Promise<R>;
}

export namespace List {
  export type Params = {
    keywords?: string[];
    filters?: Filter[];
    page: number;
    pageSize: number;
  };

  export type Filter = {
    [key: string]: any;
    value: string;
  };
}
