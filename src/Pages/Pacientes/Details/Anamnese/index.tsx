import React, { useState } from "react";
import Patient from "../../../../Infra/DAOarchive/model";
import { update } from "../../../../Infra/DAOarchive/patientDAO";
import { useToastContext } from "../../../../Components/Context/Toast";
import { patientExist } from "../../../../Components/Utils/midlleware";
import {
  Container,
  Title,
  Text,
  Edit,
  TextArea,
  Save,
  Actions,
} from "./styles";
interface AnamneseProps {
  patient: Patient;
  closeModal: Function;
}

const Anamnese: React.FC<AnamneseProps> = ({ patient, closeModal }) => {
  const [edit, setEdit] = useState(false);
  const [anamneseText, setAnamneseText] = useState(() =>
    !!patient.anamnese ? patient.anamnese : ""
  );
  const addToast = useToastContext();

  function handleAddAnamnese() {
    if (patientExist(patient.personalData.id)) {
      patient.anamnese = !patient.anamnese ? "" : patient.anamnese;
      patient.anamnese = anamneseText;
      update(patient);
      addToast("Sucesso", "sucess");
      closeModal();
    }
  }

  return (
    <Container>
      <Title>Anamnese</Title>
      {!edit && <Text>{anamneseText || "<Vazio>"}</Text>}
      {edit && (
        <TextArea
          onChange={({ target }) => setAnamneseText(target.value)}
          value={anamneseText}
        />
      )}
      <Actions>
        <Edit onClick={() => setEdit(!edit)}>
          {edit ? "Concluir" : "Editar"}
        </Edit>
        {!edit && <Save onClick={handleAddAnamnese}>Salvar</Save>}
      </Actions>
    </Container>
  );
};
export default Anamnese;
