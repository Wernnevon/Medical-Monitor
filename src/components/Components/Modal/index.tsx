import React from "react";

import {ModalContainer, ModalContent} from './styles'

interface ModalProps {
  modalState: boolean;
  closeModal: () => void;
  component?: React.FC;
}

const Modal: React.FC<ModalProps> = ({
  modalState,
  closeModal,
  component,
}: ModalProps) => {
  return (
    <ModalContainer onClick={closeModal} show={modalState}>
      <ModalContent onClick={(e:any)=>e.stopPropagation()}>
        <button onClick={closeModal}>fechar</button>
      </ModalContent>
    </ModalContainer>
  );
};
export default Modal;
