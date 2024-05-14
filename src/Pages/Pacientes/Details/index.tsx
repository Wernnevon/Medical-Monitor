/* eslint-disable react-hooks/exhaustive-deps */
import React, { useLayoutEffect, useState } from "react";
import { FaAllergies, FaWeightHanging } from "react-icons/fa";
import { GiBodyHeight } from "react-icons/gi";
import { IoPerson } from "react-icons/io5";
import { useParams } from "react-router-dom";

import {
  Container,
  PacienteCard,
  CardText,
  PersonalDataCard,
  HealtyhCardText,
  TitleCard,
  Title,
  AnamneseCard,
  TableCard,
} from "./styles";
import { Patient } from "../../../Infra/Entities";
import { makeLocalPatientFind } from "../../../Factories";
import Table from "../../../Components/Table";
import { formmatDate, getAge } from "../../../Components/Utils/dateUtils";

const initial: Patient = {
  anamnese: "",
  name: "",
  birthday: new Date(),
  fatherName: "",
  motherName: "",
  rg: "",
  cpf: "",
  gender: "",
  health: {
    healthInsurance: "",
    allergy: undefined,
    weight: undefined,
    height: undefined,
  },
  adress: {
    city: "",
    neighborhood: "",
    street: "",
    number: 0,
    complement: undefined,
  },
};

const Details: React.FC = () => {
  const [patient, setPatient] = useState<Patient>(initial);
  const { id } = useParams();
  const patientFind = makeLocalPatientFind();

  useLayoutEffect(() => {
    patientFind.findOne({ query: id }).then(([resp]: any) => {
      setPatient(resp);
    });
  }, []);

  return (
    <Container>
      <PacienteCard>
        <TitleCard>
          <IoPerson
            color="#03a696"
            size={40}
            style={{ position: "relative", bottom: ".15rem" }}
          />
          <Title>{patient.name}</Title>
        </TitleCard>
        <div>
          <PersonalDataCard>
            <CardText>
              <label>Nome: </label>
              <label>{patient.name}</label>
            </CardText>
            <div>
              <span>
                {/* Dados Pessoais */}
                <CardText>
                  <label>Nome da mãe: </label>
                  <label>{patient.motherName}</label>
                </CardText>
                <CardText>
                  <label>Nome do Pai: </label>
                  <label>{patient.fatherName}</label>
                </CardText>
                <CardText>
                  <label>Data de Nascimento: </label>
                  <label>{formmatDate(patient.birthday)}</label>
                </CardText>
                <CardText>
                  <label>Idade: </label>
                  <label>{getAge(patient.birthday)} anos</label>
                </CardText>
                <CardText>
                  <label>RG: </label>
                  <label>{patient.rg}</label>
                </CardText>
              </span>
              <span>
                <CardText>
                  <label>CPF: </label>
                  <label>{patient.cpf}</label>
                </CardText>
                <CardText>
                  <label>Convênio: </label>
                  <label>{patient.health.healthInsurance}</label>
                </CardText>

                <CardText>
                  <label>Gênero: </label>
                  <label>{patient.gender}</label>
                </CardText>
                <CardText>
                  <label>Telefone: </label>
                  <label>
                    {patient.phone ? patient.phone : "Não informado"}
                  </label>
                </CardText>
                <CardText>
                  <label>Endereço: </label>
                  <label>
                    {patient.adress.street},{" "}
                    {!!patient.adress.number && `${patient.adress.number}, `}
                    {patient.adress.neighborhood}, {patient.adress.city}
                  </label>
                </CardText>
              </span>
              {/* Dados de saúde */}
              <span>
                <HealtyhCardText>
                  <FaAllergies color="#555" />
                  <label>{patient.health.allergy}</label>
                </HealtyhCardText>
                <HealtyhCardText>
                  <FaWeightHanging color="#555" />
                  <label>{patient.health.weight} kg</label>
                </HealtyhCardText>
                <HealtyhCardText>
                  <GiBodyHeight color="#555" />
                  <label>{patient.health.height} cm</label>
                </HealtyhCardText>
              </span>
            </div>
          </PersonalDataCard>
          <AnamneseCard>
            <textarea name="" id=""></textarea>
          </AnamneseCard>
        </div>
        <TableCard>
          <Table
            title="Exames"
            columns={[
              { name: "Exame", key: "name", type: "text" },
              { name: "Requisição", key: "requisitionDate", type: "text" },
              { name: "Realização", key: "realizationDate", type: "text" },
              { name: "Status", key: "done", type: "text" },
              { name: "", key: "action", type: "action" },
            ]}
            data={[
              {
                id: 1,
                name: "Exame 1",
                requisitionDate: "13/04/2024",
                realizationDate: "-",
                done: "Em Andamento",
              },
              {
                id: 2,
                name: "Exame 2",
                requisitionDate: "10/05/2024",
                realizationDate: "-",
                done: "Em Andamento",
              },
              {
                id: 3,
                name: "Exame 3",
                requisitionDate: "01/10/2023",
                realizationDate: "15/10/2023",
                done: "Realizado",
              },
            ]}
            filters={[
              {
                placeholder: "Buscar",
                type: "text",
                handle: (v: string) => {
                  console.log(v.split(" "));
                },
              },
            ]}
            config={{
              pagination: {
                changePage: () => {},
                actualPage: 1,
                totalPages: 1,
                totalEntries: 0,
              },
              navigateTo: "exam",
            }}
            kebabConfig={undefined}
          />
        </TableCard>
      </PacienteCard>
    </Container>
  );
};
export default Details;
