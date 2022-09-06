import React, { useEffect, useState } from "react";
import Patient from "../../../Infra/DAOarchive/model";
import { index, update } from "../../../Infra/DAOarchive/patientDAO";
import { useToastContext } from "../../Components/Context/Toast";

import Output from "../../Components/output";
import { patientExist, validate } from "../../Components/Utils/midlleware";

import {
  ReceitaContainer,
  ReceitaCard,
  LabelHeader,
  ReceituarioContainer,
  Receituario,
  SearchBar,
  SearchInput,
  SearchItem,
  ListPatient,
  ItemPatient,
  FormButtonSave,
  FormButtonClear,
  FormButtonContainer,
  PrescriptionOutputCard,
} from "./styles";

const Prescription: React.FC = () => {
  const [content, setContent] = useState([]);
  const addToast = useToastContext();
  const [medicaments, setMedicaments] = useState("");
  const [pacientes, setPacientes] = useState<Patient[]>([]);
  const [pacienteNome, setPacienteNome] = useState<string>("");
  const [patient, setPatient] = useState({} as Patient);

  const setMenssage = ()=>{
    if(content.length<=0 && !patient.name)
      return('Escolha o paciente e prescreva algo');
    else if(content.length<=0)
      return('Prescreva algo');
    else return('Escolha o paciente');
  }

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

  function handleContent(value: any) {
    setMedicaments(value.target.value);
    setContent(value.target.value.split("\n"));
  }
  function handleClear() {
    setContent([]);
    setMedicaments("");
    setPatient({} as Patient);
  }

  function clean() {
    handleClear()
    addToast('Limpo', 'sucess');
  }

  function handleAddPrecription(patientUpdate: Patient) {
    if (patientExist(patientUpdate.id) && validate(content)) {
      content.map((medicament: string) =>
      patientUpdate.medicament.push({
        medicament: medicament,
        date: new Date(),
        administering: true,
      }),
    );
    update(patient);
    addToast('Sucesso', 'sucess');
    handleClear();
    } else {
      addToast(setMenssage());
    }
  }

  return (
    <ReceitaContainer>
      <ReceitaCard>
        <ReceituarioContainer>
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
          <LabelHeader>Informe as medicações:</LabelHeader>
          <Receituario
            value={medicaments}
            onChange={(text) => handleContent(text)}
          />
          <FormButtonContainer>
            <FormButtonClear onClick={clean}>Limpar</FormButtonClear>
            <FormButtonSave onClick={() => handleAddPrecription(patient)}>
              Salvar
            </FormButtonSave>
          </FormButtonContainer>
        </ReceituarioContainer>
      </ReceitaCard>
      <PrescriptionOutputCard>
        <Output prescription={content} patientName={patient.name} />
      </PrescriptionOutputCard>
    </ReceitaContainer>
  );
};

export default Prescription;
