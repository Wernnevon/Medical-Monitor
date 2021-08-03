import Styled from "styled-components";

type PropType = {
    active?: string;
}

export const SideMenuContainer = Styled.div`
    display: flex;
    background-color: #228b22;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    width: 15vw;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    padding: 10px 0;
    overflow-y: auto;
`;
export const NavBtn = Styled.button `
    outline: none;
    border: none;
    text-transform: uppercase;
    text-decoration: none;
    display: inline-block;
    font-size: 3rem;
    font-weight: 600;
    padding: 15px 18px 5px 18px;
    border-radius: 60%;
    background-color: ${(props: PropType) => (props.active ? "#fff" : "transparent")};
    color: ${(props: PropType) => (props.active ? "#228b22" : "#fff")};
    transition: 300ms;
    box-shadow: ${(props: PropType) => (props.active ? "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" : "none")};
    :active, 
    :hover {
        background-color: #fff;
        color: #228b22;
        cursor: pointer;
    }
`;
export const NavLabel = Styled.label`
    color: #fff;
    text-transform: uppercase;
    text-decoration: none;
    display: inline-block;  
    font-size: 1.4rem;
    font-weight: 400;
    margin: 10px 0 50px 0;
    :hover{
      font-weight: 700;
    }
`;

export const Image = Styled.img`
    width: 80%;
    height: 80%;
    border-radius: 60%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

export const NavImage = Styled.button `
    outline: none;
    border: none;
    text-transform: uppercase;
    text-decoration: none;
    display: inline-block;
    font-size: 4rem;
    font-weight: 600;
    padding: 15px 18px 5px 18px;
    border-radius: 60%;
    background: none;
    margin-bottom: 20px;
    :hover,
    :active {
        cursor: pointer;
    }
`;