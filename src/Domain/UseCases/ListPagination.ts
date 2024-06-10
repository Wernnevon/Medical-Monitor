export interface ListPagination<R = any> {
  listPagination(
    params: ListPagination.Params
  ): Promise<ListPagination.Response<R>>;
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

  export type Response<R> = {
    totalEntries: number;
    entries: R[];
  };
}
