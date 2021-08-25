import React, {useEffect} from 'react';
import {testeDb} from '../../../Infra/Services/service';

import { PacienteContainer, PacienteCard } from './styles';

const Paciente: React.FC = () => {

  useEffect(() => {
      testeDb();
  }, [])

  return (
    <PacienteContainer>
      <PacienteCard>input Paciente</PacienteCard>
      <PacienteCard>output Paciente</PacienteCard>
    </PacienteContainer>
  );
}

export default Paciente