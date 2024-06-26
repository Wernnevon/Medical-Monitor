/* eslint-disable react-hooks/exhaustive-deps */
import React, { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { FaAllergies, FaWeightHanging } from "react-icons/fa";
import { GiBodyHeight } from "react-icons/gi";

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
  DataArea,
} from "./styles";
import { Patient } from "../../../../Domain/Entities";
import { formmatDate, getAge } from "../../../Utils/dateUtils";
import { FindById } from "../../../../Domain/UseCases";
import {
  makeExamListPage,
  makePrescriptionListPage,
} from "../../../../Main/Factories/Pages";
import { Breadcrumb } from "../../../Components/Breadcrumb";
import { RiFileUserFill } from "react-icons/ri";
import { Anamnese } from "./Anamnese";

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

type Props = {
  findById: FindById;
};

const Details: React.FC<Props> = ({ findById }) => {
  const breadcrumbItems = [
    { label: "Pacientes", path: "/pacientes" },
    { label: "Detalhes", path: "" },
  ];

  const [patient, setPatient] = useState<Patient>(initial);

  const { id } = useParams();

  useLayoutEffect(() => {
    if (id) {
      findById.findById({ id: Number(id) }).then((resp: any) => {
        setPatient(resp);
      });
    }
  }, []);

  return (
    <Container>
      <PacienteCard>
        <Breadcrumb items={breadcrumbItems} />

        <DataArea>
          <PersonalDataCard>
            <TitleCard>
              <RiFileUserFill
                color="#03a696"
                size={40}
                style={{ position: "relative", bottom: ".15rem" }}
              />
              <Title>{patient.name}</Title>
            </TitleCard>
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
            <Anamnese anamnese={patient.anamnese} />
          </AnamneseCard>
        </DataArea>
        <TableCard>
          {makeExamListPage(id)}
          {makePrescriptionListPage(id)}
        </TableCard>
      </PacienteCard>
    </Container>
  );
};
export default Details;
