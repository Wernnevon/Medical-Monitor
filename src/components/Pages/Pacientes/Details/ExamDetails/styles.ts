import Styled from "styled-components";

export const Container = Styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  min-width: 30vw;
  max-height: 70vh;
  margin: 1em;
  position: relative;
  overflow-y: auto;
`;
export const Card = Styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 300;
	div{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		box-sizing: border-box;
		span{
			margin-left: 1rem;	
		}
	}
`;

export const Title = Styled.label`
  font-family: 'Akshar', sans-serif;
  font-weight: 500;
  color: #03A696;
  text-align: center;
  margin: .7rem 0 1.7rem;
  font-size: 1.5em;
  width: 82%;
  border:none;
  align-self: center;
`;
