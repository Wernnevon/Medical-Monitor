import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  border-bottom: 1px solid #747474;
  width: 100%;
  padding: 0;
  box-sizing: border-box;
  position: relative;
  color: #747474;
  transition: 100ms linear;
  :focus-within {
    color: #03a696;
    border-color: #03a696;
  }
  input {
    border: none;
    outline: none;
    padding: 1.2rem 0 0.2rem;
    background: none;
    margin: 0 10px 0;
    font-size: 1.2rem;
    box-sizing: border-box;
    width: 100%;
    z-index: 5;
  }
  span {
    color: #e87c03;
    font-size: 1em;
    position: absolute;
    bottom: -1.8rem;
    box-sizing: border-box;
  }
  @media (max-width: 1200px),
    (max-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    input {
      font-size: 0.8rem;
    }
    span {
      bottom: -1rem;
      font-size: 0.7rem;
    }
  }
`;

export const Placeholder = styled.label`
  width: 100%;
  position: absolute;
  z-index: 0;
  transition: 50ms linear;
  margin-bottom: 2.5rem;
  font-size: 1.4rem;
  font-family: "Akshar-Regular";
  @media (max-width: 1200px),
    (max-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
`;
