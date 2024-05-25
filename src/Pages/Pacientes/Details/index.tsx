/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { FaAllergies, FaWeightHanging } from "react-icons/fa";
import { GiBodyHeight } from "react-icons/gi";
import { IoPerson } from "react-icons/io5";

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
import { makeLocalExamList, makeLocalPatientFind } from "../../../Factories";
import Table from "../../../Components/Table";
import { formmatDate, getAge } from "../../../Components/Utils/dateUtils";
import { List } from "../../../Infra/Interfaces";
import Exam, { ExamStatus } from "../../../Infra/Entities/Exams";
import { DataFilter } from "../../../Components/Filters";
import { PaginationType } from "../../../Components/Pagination";
import { handleFilter } from "../../../Components/Utils/filterAdpater";

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

type ExamTableData = {
  id: number;
  name: string;
  requisitionDate: string;
  realizationDate: string;
  done: string;
};

const Details: React.FC = () => {
  const [patient, setPatient] = useState<Patient>(initial);
  const [exams, setExams] = useState<ExamTableData[]>([]);
  const [filters, setFilters] = useState<List.Filter[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [pagination, setPagination] = useState<PaginationType>({
    page: 1,
    pageSize: 5,
    totalEntries: 0,
    totalPages: 1,
  });

  const filterExamTable: DataFilter[] = [
    {
      type: "radio",
      placeholder: "Status",
      handle: (filterValue: any) =>
        handleFilter({
          keyFilter: "status",
          filterValue,
          filterArray: filters,
          callback: setFilters,
        }),
      value: [
        { name: "status", value: ExamStatus.IN_PROGRESS },
        { name: "status", value: ExamStatus.DONE },
      ],
    },
    {
      placeholder: "Buscar",
      type: "text",
      handle: (v: string) => {
        setKeywords(v.split(" "));
      },
    },
  ];

  const { id } = useParams();
  const patientFind = makeLocalPatientFind();
  const examList = makeLocalExamList();

  function handleChangePage(page: number) {
    setPagination((prev) => ({ ...prev, page }));
  }

  useLayoutEffect(() => {
    if (id) {
      patientFind.findOne({ query: id }).then(([resp]: any) => {
        setPatient(resp);
        setFilters([{ key: "patientId", value: id }]);
      });
    }
  }, []);

  useEffect(() => {
    examList
      .listPerPage({
        page: pagination.page,
        pageSize: pagination.pageSize,
        filters,
        keywords,
      })
      .then(
        ({
          totalRecords,
          records,
        }: {
          totalRecords: number;
          records: Exam[];
        }) => {
          const list: ExamTableData[] = records.map(
            ({ id, name, requisitionDate, realizationDate, done }) => ({
              id: id || 0,
              name,
              requisitionDate: formmatDate(requisitionDate),
              realizationDate: realizationDate
                ? formmatDate(realizationDate)
                : "-",
              done,
            })
          );
          setPagination((prev) => ({
            ...prev,
            totalEntries: totalRecords || 0,
            totalPages: Math.ceil(totalRecords / pagination.pageSize) || 0,
          }));
          setExams(list || []);
        }
      );
  }, [filters, keywords, pagination.page]);

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
            data={exams}
            filters={filterExamTable}
            config={{
              pagination: {
                entityName: "Exames",
                changePage: handleChangePage,
                actualPage: pagination.page,
                pageSize: pagination.pageSize,
                totalPages: pagination.totalPages,
                totalEntries: pagination.totalEntries,
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
