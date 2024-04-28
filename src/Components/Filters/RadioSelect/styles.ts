import styled from "styled-components";

export const Container = styled.div<any>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  font-family: "Akshar-Light";
  font-size: 1.5rem;
  border: 1px solid #747474;
  border-bottom: ${({ collapsed }) =>
    collapsed ? "none" : "1px solid #747474"};
  border-radius: ${({ collapsed }) => (collapsed ? "5px 5px 0 0" : "5px")};
  min-width: 15rem;
  label {
    pointer-events: none;
  }
`;

export const Header = styled.div<any>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  height: 3rem;
  padding: 0 1rem;
  border-radius: ${({ collapsed }) => (collapsed ? "5px 5px 0 0" : "5px")};

  span {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  :hover {
    background-color: #ededed;
    color: #03a696;
    cursor: pointer;
  }
`;

export const Body = styled.form<any>`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: -1px;
  background-color: #fff;
  border: 1px solid #747474;
  border-radius: 0 0 5px 5px;
  width: 100%;
  z-index: 10;
  max-height: 15rem;
  visibility: ${({ collapsed }) => (collapsed ? "visible" : "hidden")};

  span {
    overflow-y: auto;
  }

  > :last-child {
    background-color: #fff;
    position: sticky;
    bottom: 0;
    border-radius: 0 0 5px 5px;
  }
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  gap: 1rem;

  input[type="radio"] {
    width: 1.5rem;
    height: 1.5rem;
    accent-color: #03a696;

    :hover {
      cursor: pointer;
    }
  }

  :hover {
    background-color: #ededed;
    cursor: pointer;
    color: #00786d;
  }
`;
