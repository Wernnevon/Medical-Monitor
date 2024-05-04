import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  position: relative;
  padding: 0 1rem;
  margin-top: 1rem;
`;
export const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  color: #333;
  b {
    font-family: "Akshar-Medium", sans-serif;
    /* font-weight: 500; */
    font-size: 1.5rem;
    text-transform: uppercase;
    text-align: center;
  }
`;
export const List = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: left;
  margin: 0 0 1.5rem;
  padding: 0 1rem;
  li {
    list-style: none;
    font-family: "Akshar-Light", sans-serif;

    font-size: 1.5rem;
    text-transform: capitalize;
    span {
      text-transform: capitalize;
      text-decoration: underline;
    }
  }
`;

export const TitleContainer = styled.span<any>`
  display: flex;
  cursor: default;
  gap: 1rem;
  position: relative;

  ::after {
    content: "";
    position: absolute;
    left: ${({ titleSpace }) => titleSpace + 3}ch;
    right: 0;
    top: 0.76rem;
    height: 1px;
    background-color: #000;
  }

  * {
    :last-child {
      cursor: pointer;
    }
  }
`;
