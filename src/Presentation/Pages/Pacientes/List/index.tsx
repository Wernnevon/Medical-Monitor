/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import { RiFileUserFill } from "react-icons/ri";
import { TiUserDelete } from "react-icons/ti";
import { LuClipboardEdit } from "react-icons/lu";
import { BiTestTube } from "react-icons/bi";

import {
  PacienteContainer,
  PacienteCard,
  ListPatient,
  PatientSection,
} from "./styles";
import Table from "../../../Components/Table";
import { useToast } from "../../../Hooks";
import { ToastTypes } from "../../../Hooks/useToast/ToastConfigs";
import { DataFilter } from "../../../Components/Filters";
import { handleFilter } from "../../../Utils/filterAdpater";
import { usePopup } from "../../../Hooks/usePopup";

import {
  Delete,
  ListPagination,
  ListCities,
  ListInsurance,
} from "../../../../Domain/UseCases";
import { Patient } from "../../../../Domain/Entities";
import { FilterDataProp } from "../../../Components/Filters/types";

type PatientTableData = {
  id: number;
  name: string;
  city: string;
  healthInsurance: string;
};

type Props = {
  list: ListPagination;
  remove: Delete;
  listCities: ListCities;
  listInsurances: ListInsurance;
};

const pageSize = 10;

const Paciente: React.FC<Props> = ({
  remove,
  list,
  listCities,
  listInsurances,
}) => {
  const addToast = useToast();
  const { showPopup } = usePopup();

  const navigate = useNavigate();

  const [pacientes, setPacientes] = useState<PatientTableData[]>([]);

  const [pagination, setPagination] = useState({
    totalEntries: 0,
    totalPages: 1,
  });

  const [page, setPage] = useState<number>(1);

  const [filters, setFilters] = useState<ListPagination.Filter[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);

  const [filtersData, setFiltersData] = useState<FilterDataProp>({
    cities: [],
    insurances: [],
  });

  const deleteUser = (value: number) => {
    const popupData = {
      data: {
        title: "Excluir Paciente?",
        message: `Tem certeza de que deseja excluir? Não há como desfazer esta ação!`,
      },
      onConfirm: () =>
        remove
          .delete({ ids: [value] })
          .then(() => {
            addToast("Paciente apagado", ToastTypes.SUCESS);
          })
          .catch(() => {
            addToast("Houve um problema", ToastTypes.ERROR);
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
      value: filtersData.insurances,
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
      value: filtersData.cities,
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
      changePage: setPage,
      actualPage: page,
      totalPages: pagination.totalPages,
      totalEntries: pagination.totalEntries,
    },
    navigateTo: "novo",
  };

  useLayoutEffect(() => {
    list
      .listPagination({
        page,
        pageSize,
        keywords,
        filters,
      })
      .then(({ entries, totalEntries }: ListPagination.Response<Patient>) => {
        const list: PatientTableData[] = entries.map(
          ({
            id,
            name,
            adress: { city },
            health: { healthInsurance },
          }: Patient) => ({ id: id || 0, name, city, healthInsurance })
        );
        setPacientes(list || []);
        setPagination({
          ...pagination,
          totalEntries: totalEntries || 0,
          totalPages: Math.ceil(totalEntries / 10) || 0,
        });
      });
  }, [page, filters, keywords, addToast]);

  useLayoutEffect(() => {
    listCities.listCities().then((res) => {
      setFiltersData((prev) => ({
        ...prev,
        cities: res.map((city) => ({ name: "city", value: city })),
      }));
    });
    listInsurances.listInsurance().then((res) => {
      setFiltersData((prev) => ({
        ...prev,
        insurances: res.map((insurance) => ({
          name: "insurance",
          value: insurance,
        })),
      }));
    });
  }, []);

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
