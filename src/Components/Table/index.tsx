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
import Pagination from "../Pagination";
import { useNavigate } from "react-router-dom";

type Props<T> = {
  title: string;
  columns: DataColumn[];
  data: DataTable<T>[];
  filters: DataFilter[];
  config?: any;
  kebabConfig: any;
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
  title = "Titulo",
  data,
  columns,
  filters,
  config,
  kebabConfig,
}: Props<any>) => {
  const navigate = useNavigate();
  function handleNavigate() {
    navigate(config.navigateTo);
  }

  return (
    <TableContainer>
      <span>
        <TableHeader>
          <TitleWrapper>
            <HiUserGroup
              color="#03a696"
              size={40}
              style={{ position: "relative", bottom: ".15rem" }}
            />
            <label>{title}</label>
          </TitleWrapper>
          <FilterWrapper>
            {filters.map((filter: DataFilter) => Filters[filter.type](filter))}
            <AddButton onClick={handleNavigate}>
              <IoPersonAdd />
              Novo
            </AddButton>
          </FilterWrapper>
        </TableHeader>
        {data && data.length ? (
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
                      widthCol={config.columnWidth && config.columnWidth[i]}
                      align="left"
                    >
                      {item[key]}
                    </Cell>
                  ) : (
                    <Cell
                      key={key + i}
                      widthCol={config.columnWidth && config.columnWidth[i]}
                      align="right"
                      isAction={true}
                    >
                      <KebabMenu rowId={item.id} items={kebabConfig} />
                    </Cell>
                  )
                )}
              </Row>
            ))}
          </TableWrapper>
        ) : (
          <label>Sem dados</label>
        )}
      </span>
      <Pagination
        entityName={config.pagination.entityName}
        changePage={config.pagination.changePage}
        page={config.pagination.actualPage}
        totalPages={config.pagination.totalPages}
        totalEntries={config.pagination.totalEntries}
        pageSize={config.pagination.pageSize}
      />
    </TableContainer>
  );
};

export default Table;
