import React from "react";
import { ModalContainer, ModalContent } from "./styles";

type ModalProps = {
  modalState: boolean;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ modalState, children }) => {
  return (
    <ModalContainer show={modalState}>
      <ModalContent show={modalState}>{children}</ModalContent>
    </ModalContainer>
  );
};
export default Modal;
