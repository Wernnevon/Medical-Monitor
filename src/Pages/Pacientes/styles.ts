import styled from "styled-components";

export const PacienteContainer = styled.div`
  display: flex;
  align-items: center;
  width: 85.7vw;
  margin-left: -0.7vw;
  height: 100%;
`;

export const PacienteCard = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 2rem;
  text-align: center;
  margin-left: 10px;
  height: 100vh;
  width: 100%;
  background-color: #ffffffeb;
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
  overflow-y: auto;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  padding: 1rem;
`;

export const ItemPatient = styled.div`
  display: flex;
  align-items: center;
  max-height: 1rem;
  padding: 1rem;
  margin: 0.5rem 0;
  background-color: #fff;
  box-shadow: 0px 3px 8px 0px #00000033;
  border-radius: 2px;
  :hover {
    cursor: pointer;
  }
  :active {
    transform: translateY(2px);
  }
  label {
    font-family: "Akshar-Regular", sans-serif;
    font-size: 1.3rem;
    color: #333;
    cursor: pointer;
  }
  @media (max-width: 1200px),
    (max-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    margin: 0.3rem 0;
    padding: 0.7rem;
    label {
      font-size: 0.9rem;
    }
  }
`;
