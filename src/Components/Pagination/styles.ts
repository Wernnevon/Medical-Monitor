import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 1rem;
  font-family: "Akshar-Light";
  font-size: 1.5rem;
  gap: 2rem;
  user-select: none;
`;

export const TotalLabel = styled.label`
  background-color: #eee;
  line-height: 2.5rem;
  padding: 0 1rem;
  border-radius: 5px;
`;

export const PaginationContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  label {
    font-size: 1.2rem;
  }

  svg:hover {
    cursor: pointer;
    color: #03a696;
  }
`;
