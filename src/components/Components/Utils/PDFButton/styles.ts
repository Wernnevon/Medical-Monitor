import Styled from "styled-components";

export const BTNContainer = Styled.div`
    background-color: #228b22;
    border: none;
    border-radius: 50%;
    width: min-content;
    position: absolute;
    right: -20px;
    top: -50px;
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 3px #999;
    cursor: pointer;
    :hover{
        background-color: #3e8e41;
    }
    :active{
        background-color: #3e8e41;
        transform: translateY(4px);
        box-shadow: 0px 2px #666;
    }
`;

export const Icon = Styled.svg`
    color: #fff;
`;