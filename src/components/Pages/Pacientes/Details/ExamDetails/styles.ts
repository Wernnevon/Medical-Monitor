import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  min-width: 30vw;
  max-height: 70vh;
  margin: 1em;
  position: relative;
  overflow-y: auto;
`;
export const Card = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  font-weight: 300;
  margin: 0 5rem;
  span {
    margin-left: 1rem;
  }
`;

export const DateLine = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
`;

export const SatusLine = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  span {
    font-family: "Akshar", sans-serif;
    font-weight: 500;
    color: #03a696;
    user-select: none;
    :hover {
      cursor: pointer;
    }
  }
`;

export const DiagnosisLine = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
`;

export const Title = styled.label`
  font-family: "Akshar", sans-serif;
  font-weight: 500;
  color: #03a696;
  text-align: center;
  margin: 0.7rem 0 1.7rem;
  font-size: 1.5em;
  width: 82%;
  border: none;
  align-self: center;
`;

export const ExamContent = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  min-width: 30vw;
  width: 60vw;
  max-width: 60vw;
  max-height: 70vh;
  height: 100%;
  position: relative;
`;

export const PrescriptionContent = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  min-width: 30vw;
  width: 60vw;
  max-width: 60vw;
  max-height: 70vh;
  height: 100%;
  position: relative;
`;
