export interface ListCities {
  listCities(): Promise<ListCities.Reponse>;
}

export namespace ListCities {
  export type Reponse = string[];
}
