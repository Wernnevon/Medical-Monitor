export interface ChangeStatus {
  changeStatus(params: ChangeStatus.Params): Promise<void>;
}

export namespace ChangeStatus {
  export type Params = {
    id: number;
  };
}
