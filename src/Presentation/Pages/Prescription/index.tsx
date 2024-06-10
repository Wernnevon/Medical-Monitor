/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useLayoutEffect, useState } from "react";
import { useToast } from "../../Hooks";

import Output from "../../Components/output";
import { patientExist, validate } from "../../Utils/midlleware";

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
} from "./styles";
import { useParams } from "react-router-dom";
import { PrescriptionSatus } from "../../../Domain/Entities/Prescription";
import { ToastTypes } from "../../Hooks/useToast/ToastConfigs";
import { Add, FindById } from "../../../Domain/UseCases";

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
              administering: PrescriptionSatus.ADMINISTERING,
              date: new Date(Date.now()).toISOString().substring(0, 10),
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
      <ReceitaCard>
        {name}
        <ReceituarioContainer>
          <LabelHeader>Informe as medicações:</LabelHeader>
          <Receituario
            value={medicaments}
            onChange={(text) => handleContent(text)}
          />
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
    </ReceitaContainer>
  );
};

export default Prescription;
