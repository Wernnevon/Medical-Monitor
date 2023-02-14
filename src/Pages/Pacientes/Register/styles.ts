import styled from "styled-components";

interface CardProps {
  color: string;
}

export const Container = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  min-width: 60vw;
  height: 45em;
  max-height: 70vh;
  position: relative;
  overflow-y: auto;
  box-sizing: border-box;
`;

export const StepProgressContainer = styled.div`
  display: flex;
  width: 85%;
  justify-content: space-between;
  box-sizing: border-box;
  margin: 1em 0 3em;
  @media (max-width: 1200px),
    (max-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    margin: 0;
  }
`;

export const StepProgressCard = styled.div<CardProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  width: 100%;
  margin: 2rem 0;
  position: relative;
  user-select: none;
  cursor: default;
  img {
    width: 100%;
    position: absolute;
    left: 0;
    z-index: 5;
  }
  label {
    font-size: 1.2vw;
    font-family: "Akshar-SemiBold", sans-serif;
    /* font-weight: 600; */
    color: ${({ color }: CardProps) => color};
    z-index: 10;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

export const Submit = styled.button`
  width: 20em;
  position: relative;
  border: none;
  border-radius: 5em;
  outline: none;
  background-color: #03a696;
  height: 2.5rem;
  color: #fff;
  font-size: 1.3rem;
  /* font-weight: 500; */
  transition: 40ms ease-in;
  margin: 1.5em 0 4em;
  font-family: "Akshar-Medium", sans-serif;
  :hover {
    cursor: pointer;
  }
  :active {
    transform: translateY(2px);
  }
  @media (max-width: 1200px),
    (max-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    font-size: 1rem;
  }
`;

export const Title = styled.label`
  font-family: "Akshar-SemiBold", sans-serif;
  /* font-weight: 600; */
  color: #03a696;
  text-align: center;
  margin-top: 2rem;
  font-size: 2em;
  width: 82%;
  border: none;
  @media (max-width: 1200px),
    (max-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    font-size: 1.5rem;
  }
`;
