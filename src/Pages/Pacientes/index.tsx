import React, { useState, useEffect } from "react";

import { bootstrapDb, clearDB, index } from "../../Infra/DAOarchive/patientDAO";
import Patient from "../../Infra/DAOarchive/model";

import {
  PacienteContainer,
  PacienteCard,
  SearchInput,
  AddButton,
  SearchBar,
  SearchItem,
  ListPatient,
  PatientSection,
} from "./styles";
import Modal from "../../Components/Modal";
import Register from "./Register";
import { useRegister } from "../../Components/Context/RegisterContext";
import Table from "../../Components/Table";

const Paciente: React.FC = () => {
  const [pacientes, setPacientes] = useState<Patient[]>([]);
  const [pacienteNome, setPacienteNome] = useState<string>("");
  const [modalState, setModalState] = useState(false);
  const { changeStep, clearData } = useRegister();

  const getSortedPatinets = async () => {
    const patients: Patient[] = await index();

    if (patients.length) {
      const sortedPatients = patients.sort(
        (
          { personalData: { name: nameA } }: Patient,
          { personalData: { name: nameB } }: Patient
        ) => (nameA > nameB ? 1 : nameA < nameB ? -1 : 0)
      );
      setPacientes(sortedPatients);
    }
  };

  useEffect(() => {
    bootstrapDb();
  }, []);

  useEffect(() => {
    setTimeout(() => getSortedPatinets(), 100);
  }, [modalState]);

  function closeModal() {
    changeStep(1);
    clearData();
    setModalState(!modalState);
  }
  function openModal() {
    setModalState(true);
  }

  function clean() {
    clearDB();
    setPacientes([]);
  }

  return (
    <PacienteContainer>
      <Modal modalState={modalState} closeModal={closeModal}>
        <Register isOpen={modalState} close={closeModal} />
      </Modal>
      <PacienteCard>
        <button style={{ height: 30, position: "absolute" }} onClick={clean}>
          clean
        </button>
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
            <Table
              data={pacientes.map(
                ({
                  id,
                  personalData: { name },
                  adress: { city },
                  health: {helthInsurance}
                }) => ({ id, name, city, helthInsurance })
              )}
            />
          </ListPatient>
        </PatientSection>
      </PacienteCard>
    </PacienteContainer>
  );
};

export default Paciente;
