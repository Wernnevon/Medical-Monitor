import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { Container, TotalLabel, PaginationContainer } from "./styles";

const Pagination: React.FC = () => {
  return <Container>
    <TotalLabel>30 Pacientes</TotalLabel>
    <PaginationContainer>
        <BsChevronLeft />
        <label>1 de 10</label>
        <BsChevronRight />
    </PaginationContainer>
  </Container>;
};

export default Pagination;
