import React, { ReactElement } from "react";
import { ModalContainer, ModalContent, ModalCloser } from "./styles";
import { AiOutlineClose } from "react-icons/ai";

interface ModalProps {
  modalState: boolean;
  closeModal: () => void;
  component?: ReactElement;
}

const Modal: React.FC<ModalProps> = ({
  modalState,
  closeModal,
  component
}: ModalProps) => {
  return (
    <ModalContainer show={modalState}>
      <ModalContent show={modalState}>
        <ModalCloser onClick={closeModal}>
          <AiOutlineClose color="#FFF" size={20} />
        </ModalCloser>
        {component}
      </ModalContent>
    </ModalContainer>
  );
};
export default Modal;
