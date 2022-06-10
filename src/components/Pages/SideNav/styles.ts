import Styled from "styled-components";
import { Link } from "react-router-dom";

type PropType = {
  active?: string;
};

export const SideMenuContainer = Styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    min-width: 175px;
    width: 15vw;
    padding: 10px 0;
    overflow: hidden;
    border: none;
`;
export const NavLink = Styled(Link)`
    outline: none;
    text-decoration: none;
    margin: 10px 0;
    width: ${({active}:PropType)=> active ? '98%' : 0};
    background-color: #0000004d;
    border-right: ${({active}:PropType)=> active ? '5px solid #fff' : '0px solid #fff'}; 
    transition: 300ms linear;
    :hover{
        cursor: pointer;
    }
`;
export const NavBtn = Styled.button`
    display: flex;
    outline: none;
    border: none;
    text-transform: uppercase;
    text-decoration: none;
    display: flex;
    align-items: center;
    font-size: 2rem;
    padding: 10px 20px;
    background-color: transparent;
    font-weight: 400;
    color: #fff;
    height: 100%;
    width: 20vw;
    :hover{
        font-weight: ${({active}:PropType)=> active? '400' : '500'};
        cursor: pointer;
    }
`;
export const NavLabel = Styled.label`
    color: #fff;
    text-transform: uppercase; 
    font-size: 1.3rem;
    margin-left: 10px;
    font-family: 'Akshar', sans-serif;
    :hover{
        cursor: pointer;
    }
`;
export const Image = Styled.img`
    width: 70%;
    height: 70%;
`;

export const NavImage = Styled.button`
    outline: none;
    border: none;
    text-decoration: none;
    display: flex;
    justify-content: center;
    font-size: 4rem;
    font-weight: 600;
    padding: 20px 10px;
    background: none;
    margin-bottom: 20px;
    margin-top: 20px;
    :hover,
    :active {
        cursor: pointer;
    }
`;
