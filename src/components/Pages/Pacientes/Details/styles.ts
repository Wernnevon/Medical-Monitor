import Styled from "styled-components";

export const Container = Styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 50% 50%;
    justify-content: center;
    margin: .5rem 2rem 2rem;
    padding: 2rem;
    width: 100%;
    gap: 2rem;
    box-sizing: border-box;
`;

export const Card = Styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: #fff;
    border: none;
    border-radius: 1rem;
    padding: 1rem;
    box-sizing: border-box;
    box-shadow: 0px 3px 8px 0px #00000033;
    font-weight: 300;
    font-size: 2rem;
    overflow-y: auto;
    label:first{
        font-family: 'Akshar', sans-serif;
        border: 1px solid #555;
    }
`;
export const CardItem = Styled.div`
    display: flex;
    align-items: flex-end;
    flex-direction: row;
    justify-content: space-between;
    background: none;
    font-size: 1.5rem;
    margin: .5rem 0;
    padding: .5rem;
    border-bottom: 1px solid #03A696;
    label:first-child{
        margin-right: .5rem;
    }
    button{
        border: none;
        border-radius: .2rem;
        outline: none;
        padding: .2rem 1rem;
        background-color: #03A696;
        width: max-content;
        margin-top: 1em;
        color: #fff;
        font-size: 1rem;
        font-weight: 300;
        transition: 40ms ease-in;
        font-family: 'Akshar', sans-serif;
        font-size: 1.3rem;
        :hover{
          cursor: pointer;
        }
        :active{
          transform: translateY(2px);
        }
    }
`;
export const CardText = Styled.div`
    display: flex;
    align-items: flex-end;
    flex-direction: row;
    background: none;
    font-size: 1.5rem;
    margin: .5rem 0;
    padding: .5rem;
    border-bottom: 1px solid #03A696;
    label:first-child{
        margin-right: .5rem;
    };
`;
