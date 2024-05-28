/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useLayoutEffect, useState } from "react";
import { useToastContext } from "../../Hooks/useToast";

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
import {
  makeLocalPatientFind,
  makeLocalPrescriptionStore,
} from "../../Factories";
import { PrescriptionSatus } from "../../Infra/Entities/Prescription";

const Prescription: React.FC = () => {
  const { id } = useParams();
  const [content, setContent] = useState([]);
  const addToast = useToastContext();
  const [medicaments, setMedicaments] = useState("");
  const [name, setName] = useState("");

  const findPatient = makeLocalPatientFind();
  const prescriptionStore = makeLocalPrescriptionStore();

  useLayoutEffect(() => {
    if (id)
      findPatient.findOne({ query: id }).then(([{ name }]: any) => {
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
    addToast("Limpo", "sucess");
  }

  function handleAddPrecription() {
    if (id && validate(content)) {
      content.forEach((prescription) => {
        prescriptionStore
          .store({
            data: {
              administering: PrescriptionSatus.ADMINISTERING,
              date: new Date(Date.now()).toISOString().substring(0, 10),
              medicament: prescription,
              patientId: parseInt(id),
            },
          })
          .then(() => {
            addToast("Sucesso", "sucess");
            clean();
          })
          .catch((err) => {
            addToast(err, "error");
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
