import React from "react";
import { ModalContainer, ModalContent, ModalCloser } from "./styles";
import { AiOutlineClose } from "react-icons/ai";

interface ModalProps {
  modalState: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ modalState, closeModal, children }) => {
  return (
    <ModalContainer show={modalState}>
      <ModalContent show={modalState}>
        <ModalCloser onClick={closeModal}>
          <AiOutlineClose color="#FFF" size={20} />
        </ModalCloser>
        {children}
      </ModalContent>
    </ModalContainer>
  );
};
export default Modal;
