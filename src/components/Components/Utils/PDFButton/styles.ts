import Styled from "styled-components";

export const BTNContainer = Styled.div`
    width: min-content;
    position: relative;
    top: -22px;
    left: 110px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    :active{
        transform: translateY(4px);
    }
`;