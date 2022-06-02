import React, { useEffect, useState } from "react";
import Output from "../../Components/output";
import Dropdown from "../../Components/Dropdown";
import { useExame } from "../../Components/Context/ExameContext";

import {
  ExameCard,
  ExameContainer,
  ExameContent,
  LabelHeader,
  InputData,
  CheckoutContent,
  ExamesContent,
  SearchBar,
  SearchInput,
  SearchItem,
  ListPatient,
  ItemPatient,
} from "./styles";
import Patient from "../../../Infra/DAOarchive/model";
import { index } from "../../../Infra/DAOarchive/patientDAO";

const Exame: React.FC = () => {
  const { exames, selected } = useExame();
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

  return (
    <ExameContainer>
      <ExameCard>
        <ExameContent>
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
        </ExameContent>
        <LabelHeader>Selecione os exames:</LabelHeader>
        <ExamesContent>
          {exames.map((exame) => (
            <Dropdown
              key={exame.type}
              type={exame.type}
              exames={exame.exames}
            />
          ))}
          <CheckoutContent
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
              width: "95%",
              margin: "10px 0px 20px 0px",
            }}
          >
            <LabelHeader>Outros Exames:</LabelHeader>
            <InputData />
          </CheckoutContent>
        </ExamesContent>
      </ExameCard>
      <Output exames={selected} patientData={patient} />
    </ExameContainer>
  );
};

export default Exame;
