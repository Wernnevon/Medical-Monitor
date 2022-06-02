import React, { useEffect, useState } from 'react';
import Patient from '../../../Infra/DAOarchive/model';
import { index } from '../../../Infra/DAOarchive/patientDAO';

import Output from '../../Components/output';

import { 
  ReceitaContainer,
  ReceitaCard,
  LabelHeader,
  ReceituarioContainer,
  Receituario,
  SearchBar,
  SearchInput,
  SearchItem,
  ListPatient,
  ItemPatient,
} 
  
  from './styles';

const Prescription: React.FC = () => {

  const [content, setContent] = useState([]);
  const [pacientes, setPacientes] = useState<Patient[]>([]);
  const [pacienteNome, setPacienteNome] = useState<string>("");
  const [patient, setPatient] = useState({} as any);

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

  function handleContent(value: any){
    setContent(value.target.value.split("\n"));
  }

  return (
    <ReceitaContainer>
      <ReceitaCard>
        <ReceituarioContainer>
        <SearchBar>
            <SearchInput
              onChange={(e) => setPacienteNome(e.target.value)}
              value={pacienteNome}
              placeholder="Pesquisar Paciente"
            />
            <SearchItem size={22} />
          </SearchBar>
          <ListPatient>
            {pacientes
              .filter((paciente) => {
                if (pacienteNome === "") return paciente;
                else if (
                  paciente.name
                    .toLocaleLowerCase()
                    .includes(pacienteNome.toLocaleLowerCase())
                )
                  return paciente;
              })
              .map((paciente: Patient) => (
                <ItemPatient
                  onClick={() =>
                    setPatient({
                      name: paciente.name,
                      birthday: paciente.birthday,
                      healthInsurance: paciente.helthInsurance,
                    })
                  }
                  key={paciente.id}
                >
                  <label>{paciente.name}</label>
                </ItemPatient>
              ))}
          </ListPatient>
          <LabelHeader>Informe as medicações:</LabelHeader>
          <Receituario onChange={(text) => handleContent(text)} />
        </ReceituarioContainer>
      </ReceitaCard>
      <Output content={content} patientData={patient}/>
    </ReceitaContainer>
  );
}

export default Prescription;