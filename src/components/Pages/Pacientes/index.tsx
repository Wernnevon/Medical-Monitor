import React, {useState, useEffect} from 'react';

import {create, index} from "../../../Infra/DAOarchive/patientDAO"

import { PacienteContainer, PacienteCard } from './styles';

const Paciente: React.FC = () => {

  const [patient, setPaciente] = useState([]);

  const patientPersist = {
    nome: 'João',
    idade: 78,
    endereco: {
      cidade: 'cajazeiras',
      bairro: 'centro',
      rua: 'rua teste',
      numero: 100,
      complemento: 'none'
    },
    exames: [
      {
        nome: 'TSH',
        data: new Date(),
        realizado: true,
      }
    ],
    receitas: [
      {
        medicamento: 'fsdfsdfsd',
        data: new Date(),
        administrando: true,
      },
      {
        medicamento: 'adsasda',
        data: new Date(),
        administrando: true,
      }
    ],
  }

  useEffect(() => {

    // create(patientPersist);
    // console.log(index());

  }, [patient])
  
  return (
    <PacienteContainer>
      <PacienteCard>input Paciente</PacienteCard>
      <PacienteCard>output Paciente</PacienteCard>
    </PacienteContainer>
  );
}

export default Paciente