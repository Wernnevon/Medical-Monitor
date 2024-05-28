/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useLayoutEffect } from "react";
import { FaUserEdit } from "react-icons/fa";
import { RiFileUserFill } from "react-icons/ri";
import { TiUserDelete } from "react-icons/ti";

import {
  PacienteContainer,
  PacienteCard,
  ListPatient,
  PatientSection,
} from "./styles";
import Table from "../../../Components/Table";
import {
  makeLocalPatientDelete,
  makeLocalPatientList,
} from "../../../Factories";
import { List } from "../../../Infra/Interfaces";
import { useNavigate } from "react-router-dom";
import { Patient } from "../../../Infra/Entities";
import { useToast } from "../../../Hooks";
import { AlertTypes } from "../../../Hooks/useToast/ToastConfigs";
import { DataFilter } from "../../../Components/Filters";
import { PaginationType } from "../../../Components/Pagination";
import { handleFilter } from "../../../Utils/filterAdpater";
import { LuClipboardEdit } from "react-icons/lu";
import { BiTestTube } from "react-icons/bi";
import { usePopup } from "../../../Hooks/usePopup";

type PatientTableData = {
  id: number;
  name: string;
  city: string;
  healthInsurance: string;
};

const Paciente: React.FC = () => {
  const patientList = makeLocalPatientList();
  const deletePatient = makeLocalPatientDelete();
  const addToast = useToast();
  const { showPopup } = usePopup();

  const navigate = useNavigate();

  const [pacientes, setPacientes] = useState<PatientTableData[]>([]);

  const [pagination, setPagination] = useState<PaginationType>({
    page: 1,
    pageSize: 10,
    totalEntries: 0,
    totalPages: 1,
  });

  const [filters, setFilters] = useState<List.Filter[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);

  const [filtersData, setFiltersData] = useState<any>({});

  const deleteUser = (value: number) => {
    const popupData = {
      data: {
        title: "Excluir Paciente?",
        message: `Tem certeza de que deseja excluir? Não há como desfazer esta ação!`,
      },
      onConfirm: () =>
        deletePatient
          .delete({ id: value })
          .then(() => {
            addToast("Paciente apagado", AlertTypes.SUCESS);
          })
          .catch(() => {
            addToast("Houve um problema", AlertTypes.ERROR);
          }),
    };
    showPopup(popupData);
  };

  const kebabConfigs = [
    {
      icon: <RiFileUserFill />,
      name: "Ver detalhes",
      action: (id: number) => {
        navigate(`detalhes/${id}`);
      },
    },
    {
      icon: <FaUserEdit />,
      name: "Editar",
      action: (id: number) => {
        navigate(`editar/${id}`);
      },
    },
    {
      icon: <LuClipboardEdit />,
      name: "Precrever",
      action: (id: number) => {
        navigate(`detalhes/${id}/receitas`);
      },
    },
    {
      icon: <BiTestTube />,
      name: "Exame",
      action: (id: number) => {
        navigate(`detalhes/${id}/exames`);
      },
    },
    {
      icon: <TiUserDelete />,
      name: "Deletar",
      action: deleteUser,
    },
  ];

  const tableFilters: DataFilter[] = [
    {
      placeholder: "Convenio",
      type: "radio",
      handle: (filterValue: any) =>
        handleFilter({
          keyFilter: "healthInsurance",
          filterValue,
          filterArray: filters,
          callback: setFilters,
        }),
      value: filtersData.insurance,
    },
    {
      placeholder: "Cidade",
      type: "radio",
      handle: (filterValue: any) =>
        handleFilter({
          keyFilter: "city",
          filterValue,
          filterArray: filters,
          callback: setFilters,
        }),
      value: filtersData.city,
    },
    {
      placeholder: "Buscar",
      type: "text",
      handle: (v: string) => {
        setKeywords(v.split(" "));
      },
    },
  ];

  const tableColumns = [
    { name: "Paciente", key: "name", type: "text" },
    { name: "Cidade", key: "city", type: "text" },
    { name: "Convênio", key: "healthInsurance", type: "text" },
    { name: "", key: "action", type: "action" },
  ];

  const tableConfig = {
    columnWidth: ["40%", "27.5%", "27.5%", "5%"],
    columnAlign: ["left", "left", "left", "center"],
    pagination: {
      entityName: "Pacientes",
      changePage: handleChangePage,
      actualPage: pagination.page,
      totalPages: pagination.totalPages,
      totalEntries: pagination.totalEntries,
    },
    navigateTo: "novo",
  };

  useLayoutEffect(() => {
    patientList
      .listPerPage({
        page: pagination.page,
        pageSize: pagination.pageSize,
        keywords,
        filters,
      })
      .then(({ records, totalRecords }) => {
        const list: PatientTableData[] = records.map(
          ({
            id,
            name,
            adress: { city },
            health: { healthInsurance },
          }: Patient) => ({ id, name, city, healthInsurance })
        );
        setPacientes(list || []);
        setPagination({
          ...pagination,
          totalEntries: totalRecords || 0,
          totalPages: Math.ceil(totalRecords / 10) || 0,
        });
      });
  }, [pagination.page, filters, keywords, addToast]);

  useLayoutEffect(() => {
    patientList.listAll().then((value) => {
      setFiltersData({
        insurance: value
          .map(({ health: { healthInsurance } }) => ({
            name: "healthInsurance",
            value: healthInsurance,
          }))
          .filter((value, index, self) => self.indexOf(value) === index),
        city: value
          .map(({ adress: { city } }) => ({ name: "city", value: city }))
          .filter((value, index, self) => self.indexOf(value) === index),
      });
    });
  }, []);

  function handleChangePage(page: number) {
    setPagination((prev) => ({ ...prev, page }));
  }

  return (
    <PacienteContainer>
      <PacienteCard>
        <PatientSection>
          <ListPatient>
            <Table
              title="Pacientes"
              data={pacientes}
              columns={tableColumns}
              filters={tableFilters}
              config={tableConfig}
              kebabConfig={kebabConfigs}
            />
          </ListPatient>
        </PatientSection>
      </PacienteCard>
    </PacienteContainer>
  );
};

export default Paciente;
