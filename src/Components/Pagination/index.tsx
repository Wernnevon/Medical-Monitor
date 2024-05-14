import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { Container, TotalLabel, PaginationContainer } from "./styles";

type Props = {
  page: number;
  pageSize: number;
  totalPages: number;
  totalEntries: number;
  changePage: (e: number) => void;
};

const Pagination: React.FC<Props> = ({
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
      <TotalLabel>{totalEntries} Pacientes</TotalLabel>
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
