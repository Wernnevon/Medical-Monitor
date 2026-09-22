import KebabMenu from "../KebabMenu";
import { Badge, Cell } from "./styles";

const statusMapping: any = {
  Realizado: "positive",
  Suspenso: "positive",
  "Em Andamento": "negative",
  Administrando: "negative",
};

export const cellStrategy: any = {
  text: ({ item, key, config, i }: any) => (
    <Cell
      key={key + i}
      widthCol={config.columnWidth && config.columnWidth[i]}
      align="left"
    >
      {item[key]}
    </Cell>
  ),
  action: ({ item, key, config, i, kebabConfig }: any) => (
    <Cell
      key={key + i}
      widthCol={config.columnWidth && config.columnWidth[i]}
      align="right"
      isAction={true}
    >
      <KebabMenu rowId={item.id} items={kebabConfig} />
    </Cell>
  ),
  status: ({ item, key, config, i }: any) => (
    <Cell
      key={key + i}
      widthCol={config.columnWidth && config.columnWidth[i]}
      align="left"
    >
      <Badge status={statusMapping[item[key]]}>{item[key]}</Badge>
    </Cell>
  ),
};
