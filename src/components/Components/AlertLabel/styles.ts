import Styled from 'styled-components';

interface Props{
    fontColor: any;
}

export const LabelAlert = Styled.label`
    display: flex;
    margin: 1rem 3rem;
    font-size: 1.3rem;
    font-weight: 400;
    font-family: 'Akshar', sans-serif;
    color: ${({fontColor}:Props)=> fontColor}
`;