import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #ffffffeb;
  box-sizing: border-box;
`;

export const PacienteCard = styled.div`
  overflow-y: auto !important;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  font-size: 2rem;
  text-align: center;
  margin-left: 10px;
  width: 100%;
  height: 100vh;
  padding: 0 1rem 2rem;

  > div:first-child {
    margin-bottom: 1rem;
    margin-left: 0;
  }
`;

export const DataArea = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
  height: max-content;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: 0px 3px 13px 5px #00000021;
  background-color: #fff;
  margin-bottom: 2rem;
`;

export const TitleCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;
export const Title = styled.label`
  font-family: "Akshar-Light";
`;

export const PersonalDataCard = styled(Card)`
  width: 70%;
  align-items: flex-start;

  > div:not(:first-child) {
    width: 100%;
    display: grid;
    grid-template-columns: 0.6fr 1fr 0.6fr;
    gap: 1rem;
  }
`;

export const CardText = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  background: none;
  font-size: 1.5rem;
  margin: 0;
  padding: 0.5rem;
  /* border-bottom: 1px solid #03a696; */
  width: 100%;
  text-align: left;
  label {
    font-family: "Akshar-Light";
    :first-child {
      color: #555;
      font-size: 1.2rem;
    }
  }
`;

export const HealtyhCardText = styled(CardText)`
  flex-direction: row;
  justify-content: flex-start;
  gap: 1rem;
`;

export const AnamneseCard = styled(Card)`
  width: 30%;
`;

export const TableCard = styled(Card)`
  margin: 0;
  padding: 0;
  background-color: transparent;
  box-shadow: none;
  gap: 2rem;

  main {
    height: 40rem;
  }
`;
