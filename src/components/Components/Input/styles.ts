import Styled from "styled-components";

export const Container = Styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    border-bottom: 1px solid #747474;
    width:100%;
    padding: 0;
    box-sizing: border-box;
    position: relative;
    color: #747474;
    transition: 100ms linear;
    :focus-within{
        color: #03A696;
        border-color: #03A696;
    };
    input{
        border: none;
        outline: none;
        padding: 1.2rem 0 .2rem;
        background: none;
        margin: 0 10px 0;
        font-size: 1.2rem;
        box-sizing: border-box;
        width: 100%;
        z-index: 5;
    };
    span{
        color: #e87c03;
        font-size:0.8em;
        position: absolute;
        bottom: -1rem;
        box-sizing: border-box;
    };
`;

export const Placeholder = Styled.label`
    width: 100%;
    position: absolute;
    z-index: 0;
    transition: 50ms linear;
    margin-bottom: 2.5rem;
    font-size: 1.2rem;
`;