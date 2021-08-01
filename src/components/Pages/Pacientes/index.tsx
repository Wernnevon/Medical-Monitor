import React from 'react';

import { PacienteContainer, PacienteCard } from './styles';

const Paciente: React.FC = () => {
  return (
    <PacienteContainer>
      <PacienteCard>input Paciente</PacienteCard>
      <PacienteCard>output Paciente</PacienteCard>
    </PacienteContainer>
  );
}

export default Paciente