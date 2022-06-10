import React, { useState, useEffect } from "react";
import log from "electron-log";

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

const Paciente: React.FC = () => {
  const [pacientes, setPacientes] = useState<Patient[]>([]);
  const [pacienteNome, setPacienteNome] = useState<string>("");
  const [modalState, setModalState] = useState(false);
  
  const sortByName = (array: Array<any>) =>
    array.sort((patientA: Patient, patientB: Patient) =>
      patientA.name > patientB.name
        ? 1
        : patientA.name < patientB.name
        ? -1
        : 0,
    );


  useEffect(() => {
    setPacientes(sortByName(index()));
  }, []);

  function closeModal() {
    setModalState(!modalState);
  }

  return (
    <PacienteContainer>
      <Modal modalState={modalState} closeModal={closeModal} component={<Register/>}/>
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
                paciente.name
                  .toLocaleLowerCase()
                  .includes(pacienteNome.toLocaleLowerCase())
              ) return paciente;
            })
            .map((paciente: Patient) => (
              <ItemPatient key={paciente.id}>
                <label>
                  {paciente.name}
                </label>
              </ItemPatient>
            ))}
        </ListPatient>
       </PatientSection>
      </PacienteCard>
    </PacienteContainer>
  );
};

export default Paciente;
