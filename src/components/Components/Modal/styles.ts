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
    transition: 100ms ease-in;
`;
export const ModalContent = Styled.div`
    display: ${({ show }: PropTypes) => (show ? "flex" : "none")};
    background: #efefef;
    width: 60%;
    height: 70%;
    justify-content: center;
    align-items: center;
    transition-delay: 120ms;
    position: relative;
    border-radius: .5rem;
    box-sizing: border-box;
`;

export const ModalCloser = Styled.button`
    border: none;
    outline: none;
    padding: 5px 5px 2px;
    background: #0000008a;
    border-radius: 50%;
    position: absolute;
    right: -1rem;
    top: -1rem;
    :hover{
      cursor: pointer;
    };
    :active{
    transform: translateY(2px);
    };
    z-index: 10;
`;
