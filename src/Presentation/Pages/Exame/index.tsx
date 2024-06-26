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
  GridPanel,
} from "./styles";
import { useParams } from "react-router-dom";
import { ExamStatus } from "../../../Domain/Entities/Exams";
import { useToast } from "../../Hooks";
import { ToastTypes } from "../../Hooks/useToast/ToastConfigs";
import { Add, FindById } from "../../../Domain/UseCases";
import { getStringToday } from "../../Utils/dateUtils";
import { Breadcrumb } from "../../Components/Breadcrumb";

type Props = {
  findById: FindById;
  add: Add;
};

const Exame: React.FC<Props> = ({ add, findById }) => {
  const { id } = useParams();
  const [otherExamsText, setOtherExamsText] = useState([]);
  const [name, setName] = useState("");
  const { exames, selected, handleClear } = useExame();
  const addToast = useToast();
  const [otherExams, setOtherExams] = useState([]);

  const breadcrumbItems = id
    ? [
        { label: "Pacientes", path: "/" },
        { label: "Detalhes", path: `/pacientes/detalhes/${id}` },
        { label: "Exames", path: "" },
      ]
    : [{ label: "Exames", path: "" }];

  useLayoutEffect(() => {
    if (id)
      findById.findById({ id: Number(id) }).then(({ name }: any) => {
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
        add
          .store({
            data: {
              patientId: parseInt(id),
              name: exam,
              status: ExamStatus.IN_PROGRESS,
              requisitionDate: getStringToday(),
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
      <Breadcrumb items={breadcrumbItems} />
      <GridPanel>
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
      </GridPanel>
    </ExameContainer>
  );
};

export default Exame;
