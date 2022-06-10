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
import Patient from "../../../Infra/DAOarchive/model";
import { index, update } from "../../../Infra/DAOarchive/patientDAO";
import { patientExist, validate } from "../../Components/Utils/midlleware";
import { useToastContext } from "../../Components/Context/Toast";
import { AlertTypes } from "../../Components/Utils/ToastConfigs";

const Exame: React.FC = () => {
  const { exames, selected, handleClear } = useExame();
  const addToast = useToastContext();
  const [otherExams, setOtherExams] = useState([]);
  const [otherExamsText, setOtherExamsText] = useState("");
  const [pacientes, setPacientes] = useState<Patient[]>([]);
  const [pacienteNome, setPacienteNome] = useState<string>("");

  const [patient, setPatient] = useState({} as Patient);

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

  function handleOtherExams(event: any) {
    setOtherExamsText(event.target.value);
    setOtherExams(event.target.value.split("\n"));
  }

  function handleClearAll() {
    handleClear();
    setPatient({} as Patient);
    setOtherExams([]);
    setOtherExamsText("");
    for (const checkbox of document.querySelectorAll(
      "input[type=checkbox]",
    ) as unknown as Array<any>) {
      checkbox.checked = false;
    }
  }

  function handleAddExam(patientUpdate: Patient) {
    let allExams = [...selected, ...otherExams];
    if (patientExist(patientUpdate.id) && validate(allExams)) {
      allExams.map((exame: string) =>
        patientUpdate.exams.push({
          done: false,
          name: exame,
          requisitionDate: new Date(),
        }),
      );
      update(patient);
      handleClearAll();
    } else {
      addToast("Escolha o paciente e selecione ao menos um exame");
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
          <FormButtonClear onClick={handleClearAll}>Limpar</FormButtonClear>
          <FormButtonSave onClick={() => handleAddExam(patient)}>
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
