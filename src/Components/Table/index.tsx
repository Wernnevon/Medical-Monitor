/* eslint-disable no-useless-computed-key */
import { HiUserGroup } from "react-icons/hi";
import { IoPersonAdd } from "react-icons/io5";
import KebabMenu from "../KebabMenu";
import {
  AddButton,
  Cell,
  Row,
  TableWrapper,
  TableHeader,
  TitleWrapper,
  FilterWrapper,
  TableContainer,
} from "./styles";
import { RadioSelect, SearchTextFilter } from "../Filters";

type Props<T> = {
  columns: DataColumn[];
  data: DataTable<T>[];
  filters: DataFilter[];
  config?: any;
};

type DataTable<T> = {
  [key: string]: T;
};

type DataFilter = {
  type: "text" | "radio";
  placeholder: string;
  value?: Array<{ name: string; value: any }>;
  handle: (v?: any) => void;
};

type DataColumn = {
  name: string;
  key: string;
  type: string;
};

const Filters = {
  ["text"]: ({ handle, placeholder }: DataFilter) => (
    <SearchTextFilter
      placeholder={placeholder}
      onFind={handle}
      key={placeholder}
    />
  ),
  ["radio"]: ({ handle, placeholder, value }: DataFilter) => (
    <RadioSelect
      data={value ? value?.map(({ value }) => value) : []}
      onSelect={handle}
      placeholder={placeholder}
      key={placeholder}
    />
  ),
};

const Table: React.FC<Props<any>> = ({
  data,
  columns,
  filters,
  config,
}: Props<any>) => {
  return (
    <TableContainer>
      <TableHeader>
        <TitleWrapper>
          <HiUserGroup
            color="#03a696"
            size={40}
            style={{ position: "relative", bottom: ".15rem" }}
          />
          <label>Pacientes</label>
        </TitleWrapper>
        <FilterWrapper>
          {filters.map((filter: DataFilter) => Filters[filter.type](filter))}
          <AddButton>
            <IoPersonAdd />
            Novo
          </AddButton>
        </FilterWrapper>
      </TableHeader>
      <TableWrapper>
        <Row isHeader={true}>
          {columns &&
            columns.map((column, i) => (
              <Cell key={column.key + i}>{column.name}</Cell>
            ))}
        </Row>
        {data.map((item, index) => (
          <Row key={item.id} isOdd={index % 2 !== 0}>
            {columns.map(({ key, type }, i) =>
              type !== "action" ? (
                <Cell
                  key={key + i}
                  widthCol={config.columnWidth[i]}
                  align="left"
                >
                  {item[key]}
                </Cell>
              ) : (
                <Cell
                  key={key + i}
                  widthCol={config.columnWidth[i]}
                  align="right"
                  isAction={true}
                >
                  <KebabMenu />
                </Cell>
              )
            )}
          </Row>
        ))}
      </TableWrapper>
    </TableContainer>
  );
};

export default Table;
