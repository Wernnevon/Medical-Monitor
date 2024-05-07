import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem;
  padding: 2rem;
  width: 100%;
  box-sizing: border-box;
  background-color: #fff;
  border: none;
  border-radius: 1rem;
  box-shadow: 0px 3px 8px 0px #00000033;
  overflow-y: auto;
  @media (max-width: 1200px),
    (max-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    padding: 1rem;
  }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  /* font-weight: 300; */
  font-size: 2rem;
  font-family: "Akshar-Light", sans-serif;
  color: #2c2c2c;
  p {
    font-family: "Akshar-Medium", sans-serif;
    text-transform: capitalize;
  }
  label:first-child {
    font-family: "Akshar-Medium", sans-serif;

    text-transform: uppercase;
  }
  @media (max-width: 1200px),
    (max-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    font-size: 1.5rem;
  }
`;

export const CardText = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: row;
  background: none;
  font-size: 1.5rem;
  margin: 0.5rem 0;
  padding: 0.5rem;
  border-bottom: 1px solid #03a696;
  label:first-child {
    margin-right: 0.5rem;
    font-family: "Akshar-Medium";
  }
  @media (max-width: 1200px),
    (max-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    font-size: 1rem;
  }
`;
