export enum ToastColor {
  WARNING = "#FC0",
  ERROR = "#C30",
  SUCESS = "#390",
}
export enum ToastFontColor {
  WARNING = "#333",
  ERROR = "#FFF",
  SUCESS = "#FFF",
}

export enum ToastTypes {
  WARNING = "WARNING",
  ERROR = "ERROR",
  SUCESS = "SUCESS",
}

export const ToastColorStartegy = {
  [ToastTypes.ERROR]: ToastColor.ERROR,
  [ToastTypes.SUCESS]: ToastColor.SUCESS,
  [ToastTypes.WARNING]: ToastColor.WARNING,
};
