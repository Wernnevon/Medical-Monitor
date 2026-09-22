export type DataFilter = {
  type: "text" | "radio";
  placeholder: string;
  value?: FilterItem;
  handle: (v?: any) => void;
};

export type FilterDataProp = {
  insurances: FilterItem;
  cities: FilterItem;
};

export type FilterItem = Array<{ name: string; value: any }>;
