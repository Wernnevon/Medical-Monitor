import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  min-width: 30vw;
  width: 60vw;
  max-width: 60vw;
  max-height: 70vh;
  height: 100%;
  margin: 1em;
  position: relative;
`;

export const Title = styled.h2`
  font-family: "Akshar-Medium", sans-serif;
  /* font-weight: 500; */
  color: #03a696;
  text-align: center;
  margin: 0.7rem 0 1.7rem;
  font-size: 1.5em;
  border: none;
  align-self: center;
  @media (max-width: 1200px),
    (max-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    font-size: 1.5rem;
  }
`;

export const Text = styled.pre`
  font-family: "Akshar-Light", sans-serif;
  font-size: 1.5rem;
  /* font-weight: 300; */
  width: 100%;
  align-self: center;
  text-align: justify;
  white-space: pre-wrap;
  overflow-y: auto;
  padding: 5px 10px;
  @media (max-width: 1200px),
    (max-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    font-size: 1rem;
  }
`;

export const TextArea = styled.textarea`
  display: flex;
  justify-content: center;
  background: none;
  width: 100%;
  height: 400px;
  outline: none;
  border: 1px solid #858585;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 0.2rem 0.5rem;
  font-family: "Akshar-Light", sans-serif;
  /* font-weight: 300; */
  font-size: 1.2rem;
  margin: 20px 0px;
  line-height: 20px;
  @media (max-width: 1200px),
    (max-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    font-size: 0.9rem;
  }
`;

export const Edit = styled.button`
  width: 100%;
  position: relative;
  border: none;
  border-radius: 5em;
  outline: none;
  background-color: #fff;
  height: 2rem;
  color: #333;
  font-size: 1.3rem;
  /* font-weight: 500; */
  transition: 40ms ease-in;
  box-shadow: 0px 3px 8px 0px #00000033;
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
    font-size: 0.9rem;
    height: 1.5rem;
  }
`;

export const Save = styled.button`
  width: 100%;
  position: relative;
  border: none;
  border-radius: 5em;
  outline: none;
  background-color: #03a696;
  height: 2rem;
  color: #fff;
  font-size: 1.3rem;
  /* font-weight: 500; */
  transition: 40ms ease-in;
  box-shadow: 0px 3px 8px 0px #00000033;
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
    font-size: 0.9rem;
    height: 1.5rem;
  }
`;
export const Actions = styled.div`
  display: flex;
  gap: 1.5rem;
  align-self: center;
  width: 60%;
`;
