import Styled from "styled-components";

export const BTNContainer = Styled.div`
    display: flex;
    float: right
    width: 1.8rem;
    position: absolute;
    right: 1.5rem;
    display: flex;
    transition: 90ms linear;
    z-index: 30;
    cursor: pointer;
    :active{
        transform: translateY(2px);
    }
`;