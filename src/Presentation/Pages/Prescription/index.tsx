/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useLayoutEffect, useState } from "react";
import { useToast } from "../../Hooks";

import Output from "../../Components/output";
import { validate } from "../../Utils/midlleware";

import {
  ReceitaContainer,
  ReceitaCard,
  LabelHeader,
  ReceituarioContainer,
  Receituario,
  FormButtonSave,
  FormButtonClear,
  FormButtonContainer,
  PrescriptionOutputCard,
  GridPanel,
} from "./styles";
import { useParams } from "react-router-dom";
import { PrescriptionStatus } from "../../../Domain/Entities/Prescription";
import { ToastTypes } from "../../Hooks/useToast/ToastConfigs";
import { Add, FindById } from "../../../Domain/UseCases";
import { getStringToday } from "../../Utils/dateUtils";
import { Breadcrumb } from "../../Components/Breadcrumb";

type Props = {
  findById: FindById;
  add: Add;
};

const Prescription: React.FC<Props> = ({ add, findById }) => {
  const { id } = useParams();
  const [content, setContent] = useState([]);
  const addToast = useToast();
  const [medicaments, setMedicaments] = useState("");
  const [name, setName] = useState("");

  const breadcrumbItems = id
    ? [
        { label: "Pacientes", path: "/" },
        { label: "Detalhes", path: `/pacientes/detalhes/${id}` },
        { label: "Prescrição", path: "" },
      ]
    : [{ label: "Prescrição", path: "/receitas" }];

  useLayoutEffect(() => {
    if (id)
      findById.findById({ id: Number(id) }).then(({ name }: any) => {
        setName(name);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleContent(value: any) {
    setMedicaments(value.target.value);
    setContent(value.target.value.split("\n"));
  }
  function handleClear() {
    setContent([]);
    setMedicaments("");
  }

  function clean() {
    handleClear();
    addToast("Limpo", ToastTypes.SUCESS);
  }

  function handleAddPrecription() {
    if (id && validate(content)) {
      content.forEach((prescription) => {
        add
          .store({
            data: {
              status: PrescriptionStatus.ADMINISTERING,
              date: getStringToday(),
              medicament: prescription,
              patientId: parseInt(id),
            },
          })
          .then(() => {
            addToast(
              `Medicamentos vinculados ao paciente ${name}`,
              ToastTypes.SUCESS
            );
            handleClear();
          })
          .catch(() => {
            addToast(
              `Não foi possível vincular os medicamentos ao paciente ${name}, tente novamente mais tarde`,
              ToastTypes.ERROR
            );
          });
      });
    } else {
      addToast("Prescreva algo");
    }
  }

  return (
    <ReceitaContainer>
      <Breadcrumb items={breadcrumbItems} />
      <GridPanel>
        <ReceitaCard>
          {name}
          <ReceituarioContainer>
            <span>
              <LabelHeader>Informe as medicações:</LabelHeader>
              <Receituario
                value={medicaments}
                onChange={(text) => handleContent(text)}
              />
            </span>
            <FormButtonContainer>
              <FormButtonClear onClick={clean}>Limpar</FormButtonClear>
              {id && (
                <FormButtonSave onClick={handleAddPrecription}>
                  Salvar
                </FormButtonSave>
              )}
            </FormButtonContainer>
          </ReceituarioContainer>
        </ReceitaCard>
        <PrescriptionOutputCard>
          <Output prescription={[...content]} patientName={name} />
        </PrescriptionOutputCard>
      </GridPanel>
    </ReceitaContainer>
  );
};

export default Prescription;
