import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { Container, TotalLabel, PaginationContainer } from "./styles";

export type PaginationType = {
  page: number;
  pageSize: number;
  totalPages: number;
  totalEntries: number;
};

type Props = {
  entityName: string;

  page: number;
  pageSize: number;
  totalPages: number;
  totalEntries: number;
  changePage: (e: number) => void;
};

const Pagination: React.FC<Props> = ({
  entityName = "Entidades",
  page,
  pageSize,
  totalPages,
  totalEntries,
  changePage,
}: Props) => {
  function handleChangePage(newPage: number, type: "next" | "back") {
    if (changePage) {
      switch (type) {
        case "next":
          if (page < totalPages) changePage(newPage);
          break;
        case "back":
          if (page > 1) changePage(newPage);
          break;
        default:
          break;
      }
    }
  }
  return (
    <Container>
      <TotalLabel>
        {totalEntries} {entityName}
      </TotalLabel>
      <PaginationContainer disabled={totalEntries < pageSize}>
        <BsChevronLeft onClick={() => handleChangePage(page - 1, "back")} />
        <label>
          {page} de {totalPages}
        </label>
        <BsChevronRight onClick={() => handleChangePage(page + 1, "next")} />
      </PaginationContainer>
    </Container>
  );
};

export default Pagination;
