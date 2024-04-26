import KebabMenu from "../KebabMenu";
import { Cell, Row, TableWrapper } from "./styles";

type Props = {
  data: DataTable[];
};

type DataTable = {
  id?: string;
  name: string;
  city: string;
  helthInsurance: string;
};

const Table: React.FC<Props> = ({ data }: Props) => {

  return (
    <TableWrapper>
      <Row isHeader={true}>
        <Cell>Paciente</Cell>
        <Cell>Cidade</Cell>
        <Cell>Convênio</Cell>
        <Cell></Cell>
      </Row>
      {data.map((item, index) => (
        <Row key={item.id} isOdd={index % 2 !== 0}>
          <Cell align="left">{item.name}</Cell>
          <Cell align="left">{item.city}</Cell>
          <Cell align="left" isAction={true}>
            {item.helthInsurance}
          </Cell>
          <Cell align="right" isAction={true}>
            <KebabMenu />
          </Cell>
        </Row>
      ))}
    </TableWrapper>
  );
};

export default Table;
