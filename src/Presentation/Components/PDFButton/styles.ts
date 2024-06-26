import styled from "styled-components";

export const BTNContainer = styled.div`
  display: flex;
  float: right;
  width: 1.8rem;
  position: absolute;
  right: 1.5rem;
  display: flex;
  transition: 90ms linear;
  z-index: 30;
  cursor: pointer;
  :active {
    transform: translateY(2px);
  }
  svg {
    width: 25px;
  }
  @media print {
    display: none;
  }
  @media (max-width: 1200px),
    (max-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    width: 20px;
  }
`;
