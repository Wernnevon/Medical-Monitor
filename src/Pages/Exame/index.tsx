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
import Patient, { PersonalData } from "../../Infra/DAOarchive/model";
import { index, update } from "../../Infra/DAOarchive/patientDAO";
import { patientExist, validate } from "../../Components/Utils/midlleware";
import { useToastContext } from "../../Components/Context/Toast";
import { ExamStatus } from "../../Infra/DAOarchive/enumModel";

const Exame: React.FC = () => {
  const { exames, selected, handleClear } = useExame();
  const addToast = useToastContext();
  const [otherExams, setOtherExams] = useState([]);
  const [otherExamsText, setOtherExamsText] = useState([]);
  const [pacientes, setPacientes] = useState<Patient[]>([]);
  const [pacienteNome, setPacienteNome] = useState<string>("");

  const [patient, setPatient] = useState(() => {
    let initPatient = {} as Patient;
    initPatient.personalData = {} as PersonalData;
    return initPatient;
  });

  const setMenssage = () => {
    if ([...selected, ...otherExams].length <= 0 && !patient.personalData.name)
      return "Escolha o paciente e selecione ao menos um exame";
    else if ([...selected, ...otherExams].length <= 0)
      return "Selecione ao menos um exame";
    else return "Escolha o paciente";
  };

  const sortByName = (array: Array<any>) =>
    array.sort((patientA: Patient, patientB: Patient) =>
      patientA.personalData.name > patientB.personalData.name
        ? 1
        : patientA.personalData.name < patientB.personalData.name
        ? -1
        : 0
    );

  useEffect(() => {
    // setPacientes(sortByName(index()));
  }, []);

  function handleOtherExams(event: any) {
    setOtherExamsText(event.target.value);
    setOtherExams(event.target.value.split("\n"));
  }

  function handleClearAll() {
    setPatient(() => {
      let initPatient = {} as Patient;
      initPatient.personalData = {} as PersonalData;
      return initPatient;
    });
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
    if (patientExist(patientUpdate.personalData.id) && validate(allExams)) {
      patient.exams = !patient.exams ? [] : patient.exams;
      allExams.map((exame: string) =>
        patientUpdate.exams.push({
          done: ExamStatus.IN_PROGRESS,
          name: exame,
          requisitionDate: new Date(),
        })
      );
      // update(patient);
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
              .filter((paciente) => {
                if (pacienteNome === "") return paciente;
                else if (
                  paciente.personalData.name
                    .toLocaleLowerCase()
                    .includes(pacienteNome.toLocaleLowerCase())
                )
                  return paciente;
              })
              .map((paciente: Patient) => (
                <ItemPatient key={paciente.personalData.id}>
                  <label>{paciente.personalData.name}</label>
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
          <FormButtonSave onClick={() => handleAddExam(patient)}>
            Salvar
          </FormButtonSave>
        </FormButtonContainer>
      </ExameCard>
      <ExameOutputCard>
        <Output
          exames={[...selected, ...otherExams]}
          patientName={patient.personalData.name}
        />
      </ExameOutputCard>
    </ExameContainer>
  );
};

export default Exame;
