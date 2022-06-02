import Styled from "styled-components";
import { BsSearch } from 'react-icons/bs';

export const ReceitaContainer = Styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  align-items: center;
  width: 85vw;
  margin-left: -.7vw;
  height: 100%;

`;
export const ReceitaCard = Styled.div`
  background-color: rgba(255, 255, 255, 0.92);
  padding: 20px;
  font-size: 30px;
  text-align: center;
  margin: 0 10px;
  height: 100vh;
  overflow-y: auto;
`;

export const LabelHeader = Styled.label`
  margin-top: 5px;
  font-size: 1.5rem;
  text-align: center;
`;

export const ReceituarioContainer = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Receituario = Styled.textarea`
  display: flex;
  justify-content: center;
  background: none;
  width: 80%;
  height: 37.7%;
  outline: none;
  border: 1px solid #329bbc;
  border-radius: 5px;
  padding: 20px;
  font-family: "Arial";
  font-size: 1rem;
  margin: 20px 0px; 
  line-height:30px;
`;

export const SearchBar = Styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  border: 1px solid #747474;
  border-radius: 5em;
  width: 100%;
  margin-top: .5em;
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

export const ListPatient = Styled.div`
  display: flex;
  overflow-y: auto;
  flex-direction: column;
  width: 100%;
  max-height: 20%;
  min-height: 4rem;
  box-sizing: border-box;
  margin: .5rem 0;
  padding-top: .5rem;
`;

export const ItemPatient = Styled.div`
  display: flex;
  align-items: center;
  padding: .3rem 1rem;
  margin: .3rem 1rem;
  background-color: #FFF;
  box-shadow: 0px 3px 8px 0px #00000033;
  border-radius: 2px;
  label{
    font-family: 'Akshar', sans-serif;
    font-size: 1.1rem;
    font-weight: 300;
    color: #333
  }
`;