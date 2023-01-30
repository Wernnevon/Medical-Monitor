export const isNullOrEmptyArray = (array: Array<any> | undefined) =>
  array != null && array.length > 0;

export const isNullOrEmptyObject = (objeto: Object | undefined) =>
  !(
    typeof objeto === "object" &&
    objeto != null &&
    Object.keys(objeto).length !== 0
  );
