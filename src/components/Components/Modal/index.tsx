import React, { ReactElement } from "react";
import { ModalContainer, ModalContent, ModalCloser } from "./styles";
import { AiOutlineClose } from "react-icons/ai";
import AlertTypes from "../Utils/alertTypes";

interface ModalProps {
  modalState: boolean;
  closeModal: () => void;
  component?: ReactElement;
  configs?: any;
}

const Modal: React.FC<ModalProps> = ({
  modalState,
  closeModal,
  component,
  configs={bg:AlertTypes.DEFAULT}
}: ModalProps) => {
  return (
    <ModalContainer show={modalState}>
      <ModalContent bg={configs.bg} show={modalState}>
        <ModalCloser onClick={closeModal}>
          <AiOutlineClose color="#FFF" size={20} />
        </ModalCloser>
        {component}
      </ModalContent>
    </ModalContainer>
  );
};
export default Modal;
