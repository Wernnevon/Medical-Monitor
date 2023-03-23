export enum AlertFontColor {
  SUCESS = "#FFF",
  WARNING = "#333",
  ERROR = "#FFF",
}

export enum AlertTypes {
  SUCESS = "SUCESS",
  WARNING = "WARNING",
  ERROR = "ERROR",
}
export const AlertColors = {
  [AlertTypes.SUCESS]: "#038C3E",
  [AlertTypes.WARNING]: "#8C770A",
  [AlertTypes.ERROR]: "#8C1A11",
};
export const AlertTitle = {
  [AlertTypes.SUCESS]: "Deu tudo certo!",
  [AlertTypes.WARNING]: "Cuidado!",
  [AlertTypes.ERROR]: "Ops, algo deu errado!",
};
