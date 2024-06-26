import { ListPagination } from "../../Domain/UseCases";

type Props = {
  keyFilter: string;
  filterValue: any;
  filterArray: ListPagination.Filter[];
  callback(arg: any[]): void;
};

export function handleFilter({
  keyFilter,
  filterValue,
  filterArray,
  callback,
}: Props) {
  const filtersMap = new Map(filterArray.map(({ key, value }) => [key, value]));
  if (filterValue) filtersMap.set(keyFilter, filterValue);
  else filtersMap.delete(keyFilter);

  const filtersArray = Array.from(filtersMap, ([key, value]) => ({
    key,
    value,
  }));
  if (callback) callback(filtersArray);
}
