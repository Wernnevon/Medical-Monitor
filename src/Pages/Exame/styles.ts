import styled from "styled-components";
import { BsSearch } from "react-icons/bs";

export const ExameContainer = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  align-items: center;
  width: 85vw;
  margin-left: -0.7vw;
  height: 100vh;
  box-sizing: border-box;
`;

export const ExameOutputCard = styled.div`
  display: flex;
  justify-content: flex-start;
  height: 100%;
  @media print {
    position: absolute;
    top: 0px;
    width: 190mm;
    max-height: 290mm;
  }
`;

export const ExameCard = styled.div`
  background-color: rgba(255, 255, 255, 0.92);
  padding: 20px;
  font-size: 30px;
  text-align: center;
  margin: 0 10px;
  height: 100%;
  overflow-y: auto;
`;

export const ExameContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;

export const LabelHeader = styled.label`
  margin-top: 5px;
  font-size: 1.3rem;
  /* font-weight: 300; */
  font-family: "Akshar-Light", sans-serif;
  text-align: center;
  @media (min-width: 1200px),
    (min-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    font-size: 1.2rem;
  }
`;

export const InputData = styled.textarea`
  outline: none;
  border: none;
  background: none;
  border-bottom: 1px solid #242424;
  box-sizing: border-box;
  width: 100%;
  padding: 1px 5px;
  font-size: 1rem;
  font-family: "Akshar-Light", sans-serif;
  /* font-weight: 300; */
  min-height: 4rem;
  :focus {
    border-color: #03a696;
  }
  @media (min-width: 1200px),
    (min-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    font-size: 0.8rem;
  }
`;

export const CheckoutContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const ExamesContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify: flex-start;
  width: 100%;
  margin: 0;
  padding: 1rem 0;
  overflow: auto;
`;

export const SearchBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  border: 1px solid #747474;
  border-radius: 5em;
  width: 100%;
  margin-top: 1.5em;
  padding: 0;
  box-sizing: border-box;
  position: relative;
  color: #747474;
  transition: 100ms linear;
  :focus-within {
    color: #03a696;
    border-color: #03a696;
  }
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  padding: 0;
  background: none;
  height: 40px;
  width: calc(100% - 60px);
  margin: 0 10px 0 15px;
  font-size: 1rem;
  @media (min-width: 1200px),
    (min-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    font-size: 0.85rem;
    height: 28px;
  }
`;

export const SearchItem = styled(BsSearch)`
  position: absolute;
  right: 1rem;
  width: 24px;
  @media (min-width: 1200px),
    (min-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    width: 18px;
    right: 0.8rem;
  }
`;

export const ListPatient = styled.div`
  display: flex;
  overflow-y: auto;
  flex-direction: column;
  width: 100%;
  max-height: 25%;
  min-height: 4rem;
  box-sizing: border-box;
  margin: 0.5rem 0;
  padding-top: 0.5rem;
  @media (min-width: 1200px),
    (min-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    min-height: 1%;
    max-height: 7.5rem;
  }
`;

export const ItemPatient = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.3rem 1rem;
  margin: 0.3rem 1rem;
  background-color: #fff;
  box-shadow: 0px 3px 8px 0px #00000033;
  border-radius: 2px;
  label {
    font-family: "Akshar-Light", sans-serif;
    font-size: 1.1rem;
    /* font-weight: 300; */
    color: #333;
  }
  button {
    border: none;
    border-radius: 4px;
    outline: none;
    background-color: #03a696;
    color: #fff;
    padding: 0.4rem 1rem;
    font-size: 1rem;
    /* font-weight: 400; */
    transition: 40ms ease-in;
    font-family: "Akshar-Regular", sans-serif;
    :hover {
      cursor: pointer;
    }
    :active {
      transform: translateY(2px);
    }
  }
  @media (min-width: 1200px),
    (min-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    padding: 0.2rem 0.5rem;
    label {
      font-size: 0.9rem;
    }
    button {
      font-size: 0.8rem;
      padding: 0.1rem 0.8rem;
    }
  }
`;

export const FormButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
  position: relative;
  box-sizing: border-box;
  margin-bottom: 3rem;
`;

export const FormButtonSave = styled.button`
  border: none;
  border-radius: 4px;
  outline: none;
  background-color: #03a696;
  color: #fff;
  padding: 0.4rem 2rem;
  margin: 0 1rem;
  font-size: 1rem;
  /* font-weight: 400; */
  transition: 40ms ease-in;
  box-shadow: 0px 3px 8px 0px #00000033;
  font-family: "Akshar-Regular", sans-serif;

  :hover {
    cursor: pointer;
  }
  :active {
    transform: translateY(2px);
  }
  @media (min-width: 1200px),
    (min-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    font-size: 0.8rem;
    padding: 0.2rem 1.5rem;
    height: 28px;
    margin: 0 0.5rem;
  }
`;

export const FormButtonClear = styled.button`
  border: none;
  border-radius: 4px;
  outline: none;
  background-color: #fff;
  color: #000;
  padding: 0.4rem 2rem;
  margin: 0 1rem;
  font-size: 1rem;
  /* font-weight: 400; */
  transition: 40ms ease-in;
  box-shadow: 0px 3px 8px 0px #00000033;
  font-family: "Akshar-Regular", sans-serif;
  :hover {
    cursor: pointer;
  }
  :active {
    transform: translateY(2px);
  }
  @media (min-width: 1200px),
    (min-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    font-size: 0.8rem;
    padding: 0.2rem 1.5rem;
    height: 28px;
    margin: 0 0.5rem;
  }
`;
