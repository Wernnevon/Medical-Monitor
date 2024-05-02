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
  FormButtonSave,
  FormButtonClear,
  FormButtonContainer,
  ExameOutputCard,
} from "./styles";
import { patientExist, validate } from "../../Components/Utils/midlleware";
import { useToastContext } from "../../Components/Context/Toast";
import { Patient } from "../../Infra/Entities";

const Exame: React.FC = () => {
  const { exames, selected, handleClear } = useExame();
  const addToast = useToastContext();
  const [otherExams, setOtherExams] = useState([]);
  const [otherExamsText, setOtherExamsText] = useState([]);
  const [pacientes, setPacientes] = useState<Patient[]>([]);
  const [pacienteNome, setPacienteNome] = useState<string>("");

  const [patient, setPatient] = useState<Patient>({} as Patient);

  const setMenssage = () => {
    if ([...selected, ...otherExams].length <= 0)
      return "Escolha o paciente e selecione ao menos um exame";
    else if ([...selected, ...otherExams].length <= 0)
      return "Selecione ao menos um exame";
    else return "Escolha o paciente";
  };

  function handleOtherExams(event: any) {
    setOtherExamsText(event.target.value);
    setOtherExams(event.target.value.split("\n"));
  }

  function handleClearAll() {
    setPatient({} as Patient);
    setOtherExams([]);
    setOtherExamsText([]);
    for (const checkbox of document.querySelectorAll(
      "input[type=checkbox]"
    ) as unknown as Array<any>) {
      checkbox.checked = false;
    }
  }
  function clean() {
    handleClearAll();
    handleClear();
    addToast("Limpo", "sucess");
  }

  function handleAddExam(patientUpdate: Patient) {
    let allExams = [...selected, ...otherExams];
    if (patientExist(patientUpdate.id) && validate(allExams)) {
      addToast("Sucesso", "sucess");
      clean();
    } else {
      addToast(setMenssage());
    }
  }

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
              .filter((paciente) =>
                paciente.name
                  .toLocaleLowerCase()
                  .includes(pacienteNome.toLocaleLowerCase())
              )
              .map((paciente: Patient) => (
                <ItemPatient key={paciente.id}>
                  <label>{paciente.name}</label>
                  <button onClick={() => setPatient(paciente)}>
                    Escolher paciente
                  </button>
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
            <InputData
              value={otherExamsText}
              onChange={(e) => handleOtherExams(e)}
            />
          </CheckoutContent>
        </ExamesContent>
        <FormButtonContainer>
          <FormButtonClear onClick={clean}>Limpar</FormButtonClear>
          <FormButtonSave onClick={() => handleAddExam({} as Patient)}>
            Salvar
          </FormButtonSave>
        </FormButtonContainer>
      </ExameCard>
      <ExameOutputCard>
        <Output
          exames={[...selected, ...otherExams]}
          patientName={patient.name}
        />
      </ExameOutputCard>
    </ExameContainer>
  );
};

export default Exame;
