export interface List<R = any> {
  listAll(): Promise<R>;
}
