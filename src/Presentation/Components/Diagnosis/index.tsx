import { BiTestTube } from "react-icons/bi";
import Button from "../Buttons";
import Modal from "../Modal";
import { Container, Footer, Header, Main, TitleWrapper } from "./style";
import { CgCloseO } from "react-icons/cg";
type Props = {
  diagnosisId: number;
  onConfirm(): void;
  onCancel(): void;
  isVisible: boolean;
};

const Diagnosis: React.FC<Props> = ({
  isVisible,
  diagnosisId,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      modalState={isVisible}
      children={
        <Container>
          <Header>
            <TitleWrapper>
              <BiTestTube size={40} color="#03a696" />
              <span>Title</span>
            </TitleWrapper>
            <CgCloseO size={24} onClick={onCancel} />
          </Header>
          <Main>
            <label>Diagnóstico:</label>
            <textarea value={diagnosisId}></textarea>
          </Main>
          <Footer>
            <Button
              typeBtn={{ type: "button" }}
              typeStyle="back"
              handle={onCancel}
            >
              Cancelar
            </Button>
            <Button
              typeBtn={{ type: "submit" }}
              typeStyle="submit"
              handle={onConfirm}
            >
              Confirmar
            </Button>
          </Footer>
        </Container>
      }
    />
  );
};
export { Diagnosis };
