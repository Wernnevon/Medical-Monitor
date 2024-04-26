import styled from "styled-components";

export const TableWrapper = styled.div`
  margin: 0 0 40px 0;
  width: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  display: table;
  text-align: left;
`;

export const Row = styled.div<any>`
  display: table-row;
  background-color: ${(props) =>
    props.isHeader ? "#03a696" : props.isOdd ? "#f6f6f6" : "#fff"};
  font-family: ${(props) => (props.isHeader ? "Akshar-Regular" : "Akshar-Light")};
  color: ${(props) => (props.isHeader ? "#ffffff" : "#000000")};
  font-size: ${({ isHeader }) => isHeader ? "1.8rem" : "1.5rem"};

  div:first-child {
    width: 50%;
  }
`;

export const Cell = styled.div<any>`
  padding: .8rem 1.2rem;
  display: table-cell;
  text-align: ${({ align }) => align};
  position: relative;
`;
