export type DataFilter = {
  type: "text" | "radio";
  placeholder: string;
  value?: Array<{ name: string; value: any }>;
  handle: (v?: any) => void;
};
