import styled from "styled-components";

export const TableContainer = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 3px 13px 5px #00000021;
`;

export const TableHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  gap: 1.5rem;
`;

export const TitleWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin: 1rem 0;
  padding-bottom: 1rem;
  border-bottom: 1px solid #747474;

  label {
    font-family: "Akshar-Regular";
  }
`;

export const FilterWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 3rem;
  gap: 1rem;
`;


export const AddButton = styled.button`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  border: none;
  border-radius: 5em;
  outline: none;
  padding: 0.5rem 1.5rem;
  background-color: #03a696;
  color: #fff;
  font-size: 1rem;
  transition: 40ms ease-in;
  font-family: "Akshar-Medium", sans-serif;
  font-size: 1.3rem;
  :hover {
    cursor: pointer;
  }
  :active {
    transform: translateY(2px);
  }
  @media (max-width: 1200px),
    (max-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    height: 30px;
    padding: 0;
    font-size: 0.95rem;
  }
`;

export const TableWrapper = styled.div`
  box-sizing: border-box;
  position: relative;
  display: table;
  text-align: left;
  margin: 0 1rem 1rem;
`;

export const Row = styled.div<any>`
  display: table-row;

  background-color: ${({ isOdd, isHeader }) =>
    isHeader ? "#e1e1e1" : isOdd ? "#f6f6f6" : "#fff"};
  font-family: ${({ isHeader }) =>
    isHeader ? "Akshar-Regular" : "Akshar-Light"};
  color: #000;
  font-size: ${({ isHeader }) => (isHeader ? "1.8rem" : "1.5rem")};
`;

export const Cell = styled.div<any>`
  padding: 0.8rem 1.2rem;
  display: table-cell;
  text-align: ${({ align }) => align};
  position: relative;
  width: ${({ widthCol }) => widthCol};
`;
