import Styled from "styled-components";
import { BsSearch } from 'react-icons/bs';

export const PacienteContainer = Styled.div`
  display: flex;
  width: 85vw;
  height: 100vh;
  box-sizing: border-box;
  left: 15vw;
`;
export const PacienteCard = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  font-size: 30px;
  background-color: #ffffffeb;
  width: 26%;
`;

export const SearchBar = Styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  border: 1px solid #747474;
  border-radius: 5em;
  width:90%;
  margin: 2em 1em 0;
  padding: 0;
  box-sizing: border-box;
  position: relative;
  color: #747474;
  transition: 100ms linear;
  :focus-within{
    color: #03A696;
    border-color: #03A696;
  }
`;
export const SearchInput = Styled.input`
  border: none;
  outline: none;
  padding: 0;
  background: none;
  height: 40px;
  width: calc(100% - 60px);
  margin: 0 10px 0 15px;
  font-size: 1rem;
`;
export const SearchItem = Styled(BsSearch)`
  position: absolute;
  right: 1rem;
`;
export const AddButton = Styled.button`
  border: none;
  border-radius: 5em;
  outline: none;
  padding: 1px 5px;
  background-color: #03A696;
  height: 40px;
  width: 90%;
  margin-top: 1em;
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
  transition: 40ms ease-in;
  :hover{
    cursor: pointer;
  }
  :active{
    transform: translateY(2px);
  }
`;
export const ListPatient = Styled.div`
  display: flex;
  overflow-y: auto;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  margin: 1rem 0;
  padding-top: 1.5rem;
`;
export const ItemPatient = Styled.div`
  display: flex;
  align-items: center;
  max-height: 1rem;
  padding: 1rem;
  margin: .5rem 1rem;
  background-color: #FFF;
  box-shadow: 0px 3px 8px 0px #00000033;
  border-radius: 2px;
  label{
    font-family: 'Akshar', sans-serif;
    font-size: 1.3rem;
    color: #333
  }
`;