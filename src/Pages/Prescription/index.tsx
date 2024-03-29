/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { PrescriptionSatus } from "../../Infra/DAOarchive/enumModel";
import Patient, { PersonalData } from "../../Infra/DAOarchive/model";
import { index, update } from "../../Infra/DAOarchive/patientDAO";
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
  const [patient, setPatient] = useState<Patient>(() => {
    let initPatient = {} as Patient;
    initPatient.personalData = {} as PersonalData;
    return initPatient;
  });

  const setMenssage = () => {
    if (content.length <= 0 && !patient.personalData.name)
      return "Escolha o paciente e prescreva algo";
    else if (content.length <= 0) return "Prescreva algo";
    else return "Escolha o paciente";
  };

  const getSortedPatinets = async () => {
    const patients: Patient[] = await index();

    const sortedPatients = patients.sort(
      (
        { personalData: { name: nameA } }: Patient,
        { personalData: { name: nameB } }: Patient
      ) => (nameA > nameB ? 1 : nameA < nameB ? -1 : 0)
    );
    setPacientes(sortedPatients);
  };

  useEffect(() => {
    getSortedPatinets();
  }, []);

  function handleContent(value: any) {
    setMedicaments(value.target.value);
    setContent(value.target.value.split("\n"));
  }
  function handleClear() {
    setContent([]);
    setMedicaments("");
    setPatient(() => {
      let initPatient = {} as Patient;
      initPatient.personalData = {} as PersonalData;
      return initPatient;
    });
  }

  function clean() {
    handleClear();
    addToast("Limpo", "sucess");
  }

  function handleAddPrecription(patientUpdate: Patient) {
    if (patientExist(patientUpdate.id) && validate(content)) {
      patient.medicament = !patient.medicament ? [] : patient.medicament;
      content.map((medicament: string) =>
        patientUpdate.medicament.push({
          medicament: medicament,
          date: new Date(),
          administering: PrescriptionSatus.ADMINISTERING,
        })
      );
      update(patient);
      addToast("Sucesso", "sucess");
      clean();
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
            <SearchItem />
          </SearchBar>
          <ListPatient>
            {pacientes
              .filter((paciente) =>
                paciente.personalData.name
                  .toLocaleLowerCase()
                  .includes(pacienteNome.toLocaleLowerCase())
              )
              .map((paciente: Patient) => (
                <ItemPatient key={paciente.id}>
                  <label>{paciente.personalData.name}</label>
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
        <Output
          prescription={content}
          patientName={patient.personalData.name}
        />
      </PrescriptionOutputCard>
    </ReceitaContainer>
  );
};

export default Prescription;
