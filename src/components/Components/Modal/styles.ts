import Styled from "styled-components";

interface PropTypes {
  show: boolean;
}

export const ModalContainer = Styled.div`
    display: flex;
    visibility: ${({ show }: PropTypes) => (show ? "visible" : "hidden")};
    background: #0000008a;
    position: absolute;
    bottom: ${({ show }: PropTypes) => (show ? "0%" : "50%")};
    right: ${({ show }: PropTypes) => (show ? "0%" : "50%")};
    width: ${({ show }: PropTypes) => (show ? "100%" : "0")};
    height: ${({ show }: PropTypes) => (show ? "100%" : "0")};
    align-items: center;
    justify-content: center;
    transition: 200ms ease-in;
`;
export const ModalContent = Styled.div`
    display: flex;
    background: #efefef;
    width: 60%;
    height: 70%;
    justify-content: center;
    align-items: center;
`;
