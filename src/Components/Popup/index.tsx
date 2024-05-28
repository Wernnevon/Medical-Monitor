import { MdOutlineDeleteOutline } from "react-icons/md";
import Button from "../Buttons";
import Modal from "../Modal";
import { Container, Footer, Header, Main } from "./styles";
import { CgCloseO } from "react-icons/cg";

type Props = {
  data: PopupData;
  onConfirm(): void;
  onCancel(): void;
  isVisible: boolean;
};

type PopupData = {
  icon?: any;
  title: string;
  message: string;
};

export function Popup({ isVisible, data, onConfirm, onCancel }: Props) {
  const icon = data.icon ? data.icon : <MdOutlineDeleteOutline />;
  if (!isVisible) return null;
  return (
    <Modal
      modalState={isVisible}
      children={
        <Container>
          <Header>
            <span>{icon}</span>
            <label> {data.title}</label>
            <CgCloseO size={24} onClick={onCancel} />
          </Header>
          <Main>
            <p>{data.message}</p>
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
    ></Modal>
  );
}
