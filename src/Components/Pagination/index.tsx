import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { Container } from "./styles";

const Pagination: React.FC = () => {
  return <Container>
    <label>30 Pacientes</label>
    <div>
        <BsChevronLeft />
        <label>1 de 10</label>
        <BsChevronRight />
    </div>
  </Container>;
};

export default Pagination;
