import React, { useState, useEffect } from "react";

import { index } from "../../../Infra/DAOarchive/patientDAO";
import Patient from "../../../Infra/DAOarchive/model";

import {
  PacienteContainer,
  PacienteCard,
  SearchInput,
  AddButton,
  SearchBar,
  SearchItem,
  ListPatient,
  ItemPatient,
  PatientSection,
} from "./styles";
import Modal from "../../Components/Modal";
import Register from "./Register";
import Details from "./Details";
import { useRegister } from "../../Components/Context/RegisterContext";

const Paciente: React.FC = () => {
  const [pacientes, setPacientes] = useState<Patient[]>([]);
  const [pacienteNome, setPacienteNome] = useState<string>("");
  const [modalState, setModalState] = useState(false);
  const [patient, setPatient] = useState<Patient>({} as Patient);
  const { changeStep, clearData } = useRegister();
  const sortByName = (array: Array<any>) =>
    array.sort((patientA: Patient, patientB: Patient) =>
      patientA.personalData.name > patientB.personalData.name
        ? 1
        : patientA.personalData.name < patientB.personalData.name
        ? -1
        : 0,
    );

  useEffect(() => {
    setPacientes(sortByName(index()));
  }, []);

  function closeModal() {
    changeStep(1);
    clearData();
    setModalState(!modalState);
  }

  return (
    <PacienteContainer>
      <Modal
        modalState={modalState}
        closeModal={closeModal}
        component={<Register />}
      />
      <PacienteCard>
        <PatientSection>
          <SearchBar>
            <SearchInput
              onChange={(e) => setPacienteNome(e.target.value)}
              value={pacienteNome}
              placeholder="Pesquisar"
            />
            <SearchItem size={22} />
          </SearchBar>
          <AddButton onClick={() => setModalState(true)}>Casdastro</AddButton>
          <ListPatient>
            {pacientes
              .filter((paciente) => {
                if (pacienteNome === "") return paciente;
                else if (
                  paciente.personalData.name
                    .toLocaleLowerCase()
                    .includes(pacienteNome.toLocaleLowerCase())
                )
                  return paciente;
              })
              .map((paciente: Patient) => (
                <ItemPatient
                  onClick={() => {
                    setPatient(paciente);
                  }}
                  key={paciente.personalData.id}
                >
                  <label>{paciente.personalData.name}</label>
                </ItemPatient>
              ))}
          </ListPatient>
        </PatientSection>
        {patient.personalData && <Details patient={patient} />}
      </PacienteCard>
    </PacienteContainer>
  );
};

export default Paciente;
