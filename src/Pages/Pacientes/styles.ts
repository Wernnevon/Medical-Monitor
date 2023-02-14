import styled from "styled-components";
import { BsSearch } from "react-icons/bs";

export const PacienteContainer = styled.div`
  display: flex;
  align-items: center;
  width: 85.7vw;
  margin-left: -0.7vw;
  height: 100%;
`;

export const PacienteCard = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 2rem;
  text-align: center;
  margin-left: 10px;
  height: 100vh;
  width: 100%;
  background-color: #ffffffeb;
`;

export const PatientSection = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 12em;
  width: 35%;
  height: 100%;
  border-right: 1px solid #888;
  padding: 1.5rem;
  @media (min-width: 1200px),
    (min-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    padding: 10px;
    width: 40%;
    max-width: auto;
  }
`;

export const SearchBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  border: 1px solid #747474;
  border-radius: 5em;
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

export const AddButton = styled.button`
  border: none;
  border-radius: 5em;
  outline: none;
  padding: 0.5rem 0;
  background-color: #03a696;
  height: 40px;
  width: 100%;
  margin-top: 1em;
  color: #fff;
  font-size: 1rem;
  /* font-weight: 500; */
  transition: 40ms ease-in;
  font-family: "Akshar-Medium", sans-serif;
  font-size: 1.3rem;
  :hover {
    cursor: pointer;
  }
  :active {
    transform: translateY(2px);
  }
  @media (min-width: 1200px),
    (min-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    height: 30px;
    padding: 0;
    font-size: 0.95rem;
  }
`;

export const ListPatient = styled.div`
  display: flex;
  overflow-y: auto;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  margin: 1rem 0;
  padding-top: 1.5rem;
  @media (min-width: 1200px),
    (min-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    margin-top: 0;
  }
`;

export const ItemPatient = styled.div`
  display: flex;
  align-items: center;
  max-height: 1rem;
  padding: 1rem;
  margin: 0.5rem 0;
  background-color: #fff;
  box-shadow: 0px 3px 8px 0px #00000033;
  border-radius: 2px;
  :hover {
    cursor: pointer;
  }
  :active {
    transform: translateY(2px);
  }
  label {
    font-family: "Akshar-Regular", sans-serif;
    font-size: 1.3rem;
    color: #333;
    cursor: pointer;
  }
  @media (min-width: 1200px),
    (min-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    margin: 0.3rem 0;
    padding: 0.7rem;
    label {
      font-size: 0.9rem;
    }
  }
`;
