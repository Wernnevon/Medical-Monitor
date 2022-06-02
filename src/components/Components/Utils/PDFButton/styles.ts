import Styled from "styled-components";

export const BTNContainer = Styled.div`
    width: min-content;
    position: relative;
    top: -22px;
    left: 110px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 90ms linear;
    cursor: pointer;
    :active{
        transform: translateY(2px);
    }
`;