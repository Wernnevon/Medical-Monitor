import Styled from "styled-components";
import { Form } from "@unform/web";

export const Container = Styled.div`
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    min-width: 100%;
    height: 100%;
    position: relative;

`;
export const FormContainer = Styled(Form)`
    display: grid;
    grid-template-columns: 40% 40%;
    width: 100%;
    gap: 2rem 1rem;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
`;

export const Submit = Styled.button`
    width: 20em;
    position: absolute;
    border: none;
    border-radius: 5em;
    outline: none;
    background-color: #03A696;
    height: 2.5rem;
    color: #fff;
    font-size: 1rem;
    font-weight: 700;
    transition: 40ms ease-in;
    bottom: 2em;
    left: calc(50% - 10em);
    :hover{
        cursor: pointer;
    };
    :active{
        transform: translateY(2px);
    };
`;

export const Title = Styled.label`
    font-family: 'Akshar', sans-serif;
    font-weight: 600;
    color: #03A696;
    text-align: center;
    margin: 3rem 0 1.7rem;
    font-size: 2em;
    width: 82%;
    border:none;
    align-self: center;
`;
