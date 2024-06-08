export interface ListPagination<R = any> {
  listPagination(params: ListPagination.Params): Promise<R>;
}

export namespace ListPagination {
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
