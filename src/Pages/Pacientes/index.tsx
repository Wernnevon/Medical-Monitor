import React, { useState, useEffect } from "react";

import { bootstrapDb, clearDB, index } from "../../Infra/DAOarchive/patientDAO";
import Patient from "../../Infra/DAOarchive/model";

import {
  PacienteContainer,
  PacienteCard,
  ListPatient,
  PatientSection,
} from "./styles";
import Modal from "../../Components/Modal";
import Register from "./Register";
import { useRegister } from "../../Components/Context/RegisterContext";
import Table from "../../Components/Table";

const Paciente: React.FC = () => {
  const [pacientes, setPacientes] = useState<Patient[]>([]);
  const [page, setPage] = useState(1);
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
        <button
          style={{ height: 30, position: "absolute", bottom: 10, left: 300 }}
          onClick={clean}
        >
          clean
        </button>
        <PatientSection>
          <ListPatient>
            <Table
              data={pacientes.map(
                ({
                  id,
                  personalData: { name },
                  adress: { city },
                  health: { helthInsurance },
                }) => ({ id, name, city, helthInsurance })
              )}
              columns={[
                { name: "Paciente", key: "name", type: "text" },
                { name: "Cidade", key: "city", type: "text" },
                { name: "Convênio", key: "helthInsurance", type: "text" },
                { name: "", key: "action", type: "action" },
              ]}
              filters={[
                {
                  placeholder: "Convenio",
                  type: "radio",
                  handle: () => {},
                  value: pacientes.map(({ health: { helthInsurance } }) => ({
                    name: "helthInsurance",
                    value: helthInsurance,
                  })),
                },
                {
                  placeholder: "Cidade",
                  type: "radio",
                  handle: () => {},
                  value: pacientes.map(({ adress: { city } }) => ({
                    name: "city",
                    value: city,
                  })),
                },
                { placeholder: "Buscar", type: "text", handle: () => {} },
              ]}
              config={{
                columnWidth: ["40%", "27.5%", "27.5%", "5%"],
                columnAlign: ["left", "left", "left", "center"],
                pagination: {
                  changePage: setPage,
                  actualPage: page,
                  totalPages: 10,
                  totalEntries: 100,
                },
              }}
            />
          </ListPatient>
        </PatientSection>
      </PacienteCard>
    </PacienteContainer>
  );
};

export default Paciente;
