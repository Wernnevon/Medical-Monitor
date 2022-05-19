import React, { useState, useEffect } from "react";

import {
  create,
  index,
  findByName,
  remove,
} from "../../../Infra/DAOarchive/patientDAO";
import Patient from "../../../Infra/DAOarchive/model";

import { PacienteContainer, PacienteCard } from "./styles";
import Modal from  '../../Components/Modal'

const Paciente: React.FC = () => {
  const [pacientes, setPacientes] = useState<Patient[]>([]);
  const [pacienteNome, setPacienteNome] = useState("");
  const [modalState, setModalState] = useState(false);

  const sortByName = (array: Array<any>) =>
    array.sort((patientA: Patient, patientB: Patient) =>
      patientA.nome > patientB.nome
        ? 1
        : patientA.nome < patientB.nome
        ? -1
        : 0,
    );

  const patientPersist = {
    nome: "João",
    idade: 78,
    endereco: {
      cidade: "cajazeiras",
      bairro: "centro",
      rua: "rua teste",
      numero: 100,
      complemento: "none",
    },
    exames: [
      {
        nome: "TSH",
        data: new Date(),
        realizado: true,
      },
    ],
    receitas: [
      {
        medicamento: "fsdfsdfsd",
        data: new Date(),
        administrando: true,
      },
      {
        medicamento: "adsasda",
        data: new Date(),
        administrando: true,
      },
    ],
  };

  useEffect(() => {
    setPacientes(sortByName(index()));
  }, []);

  function handleCreate() {
    patientPersist.nome = pacienteNome;
    create(patientPersist);
    setPacientes(sortByName([patientPersist, ...pacientes]));
    setPacienteNome("");
  }

  function handleFind() {
    pacienteNome === ""
      ? setPacientes(sortByName(index()))
      : setPacientes(sortByName(findByName(pacienteNome)));
    setPacienteNome("");
  }
  function handleDelete(pacienteId: string | undefined) {
    remove(pacienteId);
    let patients = pacientes.filter((patient) => patient.id !== pacienteId);
    setPacientes(sortByName(patients));
  }

  function closeModal(){
    setModalState(!modalState);
  }

  return (
    <PacienteContainer>
      <Modal modalState={modalState} closeModal={closeModal} />
      <PacienteCard>

        <button onClick={()=> setModalState(true)}>Modal</button>

        Nome:
        <input
          onChange={(e) => setPacienteNome(e.target.value)}
          value={pacienteNome}
        />{" "}
        <br />
        <button onClick={handleCreate}>Create</button>
        <button onClick={handleFind}>Find by Name</button>
        <div style={{ overflowY: "scroll", maxHeight: "100%", width: "100%" }}>
          {pacientes.map((paciente: Patient) => (
            <div key={paciente.id}>
              <label>
                {paciente.nome}
                {" - - - "}
              </label>
              <button
                onClick={() => {
                  handleDelete(paciente.id);
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </PacienteCard>
    </PacienteContainer>
  );
};

export default Paciente;
