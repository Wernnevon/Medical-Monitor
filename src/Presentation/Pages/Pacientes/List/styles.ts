import styled from "styled-components";

export const PacienteContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #ffffffeb;
  box-sizing: border-box;
`;

export const PacienteCard = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 2rem;
  text-align: center;
  height: 100vh;
  width: 100%;
`;

export const PatientSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-right: 1px solid #888;
`;

export const ListPatient = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  padding: 1rem;
`;
