import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { Container, TotalLabel, PaginationContainer } from "./styles";

type Props = {
  actualPage: number;
  totalPages: number;
  totalEntries: number;
  changePage: (e: number) => void;
};

const Pagination: React.FC<Props> = ({
  actualPage,
  totalPages,
  totalEntries,
  changePage,
}: Props) => {
  function handleChangePage(page: number, type: "next" | "back") {
    if (changePage) {
      switch (type) {
        case "next":
          if (actualPage < totalPages) changePage(page);
          break;
        case "back":
          if (actualPage > 1) changePage(page);
          break;
        default:
          break;
      }
    }
  }
  return (
    <Container>
      <TotalLabel>{totalEntries} Pacientes</TotalLabel>
      <PaginationContainer>
        <BsChevronLeft
          onClick={() => handleChangePage(actualPage - 1, "back")}
        />
        <label>
          {actualPage} de {totalPages}
        </label>
        <BsChevronRight
          onClick={() => handleChangePage(actualPage + 1, "next")}
        />
      </PaginationContainer>
    </Container>
  );
};

export default Pagination;
