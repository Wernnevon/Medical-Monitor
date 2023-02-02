import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  width: 100%;
  position: relative;
`;
export const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 3em;
  overflow-y: auto;
  height: 208px;
  color: #333;
  b {
    font-family: "Akshar", sans-serif;
    font-weight: 500;
    font-size: 1.5rem;
    text-transform: uppercase;
    text-align: center;
  }
`;
export const List = styled.ul`
  display: grid;
  grid-template-columns: auto auto;
  li {
    list-style: none;
    font-weight: 300;
    font-size: 1.2rem;
    text-transform: capitalize;
    span {
      text-transform: uppercase;
    }
  }
`;

export const TitleContainer = styled.span`
  display: flex;
  justify-content: center;
  cursor: default;
  gap: 1rem;
  * {
    :last-child {
      cursor: pointer;
    }
  }
`;
