import { BsSearch } from "react-icons/bs";
import styled from "styled-components";

export const SearchBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  border: 1px solid #747474;
  border-radius: 5em;
  padding: 0;
  box-sizing: border-box;
  position: relative;
  color: #747474;
  transition: 100ms linear;
  width: 100%;
  :focus-within {
    color: #03a696;
    border-color: #03a696;
  }
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  padding: 0;
  padding-right: 2.4rem;
  background: none;
  height: 40px;
  width: 100%;
  margin: 0 10px 0 15px;
  font-size: 1rem;
  @media (max-width: 1200px),
    (max-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    font-size: 0.85rem;
    height: 28px;
  }
`;

export const SearchItem = styled(BsSearch)`
  position: absolute;
  right: 1rem;
  width: 24px;
  pointer-events: none;
  @media (max-width: 1200px),
    (max-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    width: 18px;
    right: 0.8rem;
  }
`;