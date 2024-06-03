import styled from "styled-components";

export const TableContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 3px 13px 5px #00000021;

  > span {
    display: flex;
    flex-direction: column;
    height: 100%;

    > label {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-family: "Akshar-Regular";
      color: #444;
      height: 100%;
    }
  }
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

  svg {
    position: relative;
    font-size: 2.5rem;
    bottom: 0.15rem;
    color: #03a696;
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
