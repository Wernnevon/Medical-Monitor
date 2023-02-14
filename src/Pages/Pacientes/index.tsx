import React, { useState, useEffect } from "react";

import { index } from "../../Infra/DAOarchive/patientDAO";
import Patient from "../../Infra/DAOarchive/model";

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

  const getSortedPatinets = async () => {
    const patients: Patient[] = await index();

    const sortedPatients = patients.sort(
      (
        { personalData: { name: nameA } }: Patient,
        { personalData: { name: nameB } }: Patient
      ) => (nameA > nameB ? 1 : nameA < nameB ? -1 : 0)
    );
    setPacientes(sortedPatients);
  };

  useEffect(() => {
    getSortedPatinets();
  }, [modalState]);

  useEffect(() => {
    if (pacientes.length) {
      setPatient(pacientes[0]);
    }
  }, [pacientes]);

  function closeModal() {
    changeStep(1);
    clearData();
    setModalState(!modalState);
  }
  function openModal() {
    setModalState(true);
  }

  return (
    <PacienteContainer>
      <Modal modalState={modalState} closeModal={closeModal}>
        <Register isOpen={modalState} close={closeModal} />
      </Modal>
      <PacienteCard>
        <PatientSection>
          <SearchBar>
            <SearchInput
              onChange={(e) => setPacienteNome(e.target.value)}
              value={pacienteNome}
              placeholder="Pesquisar"
            />
            <SearchItem />
          </SearchBar>
          <AddButton onClick={openModal}>Cadastro</AddButton>
          <ListPatient>
            {pacientes
              .filter((paciente) =>
                paciente.personalData.name
                  .toLocaleLowerCase()
                  .includes(pacienteNome.toLocaleLowerCase())
              )
              .map((paciente: Patient) => (
                <ItemPatient
                  onClick={() => {
                    setPatient(paciente);
                  }}
                  key={paciente.id}
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
