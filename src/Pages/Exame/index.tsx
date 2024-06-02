/* eslint-disable react-hooks/exhaustive-deps */
import React, { useLayoutEffect, useState } from "react";
import Output from "../../Components/output";
import Dropdown from "../../Components/Dropdown";
import { useExame } from "../../Hooks";

import {
  ExameCard,
  ExameContainer,
  LabelHeader,
  InputData,
  CheckoutContent,
  ExamesContent,
  FormButtonSave,
  FormButtonClear,
  FormButtonContainer,
  ExameOutputCard,
} from "./styles";
import { makeLocalExamStore, makeLocalPatientFind } from "../../Factories";
import { useParams } from "react-router-dom";
import { ExamStatus } from "../../Infra/Entities/Exams";
import { useToast } from "../../Hooks";
import { ToastTypes } from "../../Hooks/useToast/ToastConfigs";

const Exame: React.FC = () => {
  const { id } = useParams();
  const [otherExamsText, setOtherExamsText] = useState([]);
  const [name, setName] = useState("");
  const { exames, selected, handleClear } = useExame();
  const addToast = useToast();
  const [otherExams, setOtherExams] = useState([]);

  const findPatient = makeLocalPatientFind();
  const examStore = makeLocalExamStore();

  useLayoutEffect(() => {
    if (id)
      findPatient.findOne({ query: id }).then(([{ name }]: any) => {
        setName(name);
      });
  }, []);

  function handleOtherExams(event: any) {
    setOtherExamsText(event.target.value);
    setOtherExams(event.target.value.split("\n"));
  }

  function handleClearAll() {
    setOtherExams([]);
    setOtherExamsText([]);
    for (const checkbox of document.querySelectorAll(
      "input[type=checkbox]"
    ) as unknown as Array<any>) {
      checkbox.checked = false;
    }
    handleClear();
  }
  function clean() {
    handleClearAll();
    addToast("Limpo", ToastTypes.SUCESS);
  }

  function handleAddExam() {
    const allExams = [...selected, ...otherExams];
    if (id && allExams.length) {
      allExams.forEach((exam) => {
        examStore
          .store({
            data: {
              patientId: parseInt(id),
              name: exam,
              requisitionDate: new Date(Date.now())
                .toISOString()
                .substring(0, 10),
              done: ExamStatus.IN_PROGRESS,
            },
          })
          .then(() => {
            addToast(
              `Exames vinculados ao paciente ${name}`,
              ToastTypes.SUCESS
            );
          })
          .catch(() => {
            addToast(
              `Não foi possível vincular os medicamentos ao paciente ${name}, tente novamente mais tarde`,
              ToastTypes.ERROR
            );
          });
      });
      handleClearAll();
    } else {
      addToast("Selecione ao menos um exame");
    }
  }

  return (
    <ExameContainer>
      <ExameCard>
        <ExamesContent>
          {name}
          <LabelHeader>Selecione os exames:</LabelHeader>
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
          {id && (
            <FormButtonSave onClick={handleAddExam}>Salvar</FormButtonSave>
          )}
        </FormButtonContainer>
      </ExameCard>
      <ExameOutputCard>
        <Output exames={[...selected, ...otherExams]} patientName={name} />
      </ExameOutputCard>
    </ExameContainer>
  );
};

export default Exame;
