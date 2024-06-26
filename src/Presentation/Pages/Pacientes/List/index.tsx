/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useLayoutEffect, useCallback } from "react";
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
import { Breadcrumb } from "../../../Components/Breadcrumb";

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

  const breadcrumbItems = [{ label: "Pacientes", path: "" }];

  const fetchPatients = useCallback(async () => {
    try {
      const { entries, totalEntries } = await list.listPagination({
        page,
        pageSize,
        keywords,
        filters,
      });
      const patientList: PatientTableData[] = entries.map(
        ({
          id,
          name,
          adress: { city },
          health: { healthInsurance },
        }: Patient) => ({
          id: id || 0,
          name,
          city,
          healthInsurance,
        })
      );
      setPacientes(patientList);
      setPagination({
        totalEntries: totalEntries || 0,
        totalPages: Math.ceil(totalEntries / pageSize) || 0,
      });
    } catch (error) {
      addToast("Erro ao carregar pacientes", ToastTypes.ERROR);
    }
  }, [page, pageSize, keywords, filters, list, addToast]);

  const fetchFiltersData = useCallback(async () => {
    try {
      const cities = await listCities.listCities();
      const insurances = await listInsurances.listInsurance();
      setFiltersData({
        cities: cities.map((city) => ({ name: "city", value: city })),
        insurances: insurances.map((insurance) => ({
          name: "healthInsurance",
          value: insurance,
        })),
      });
    } catch (error) {
      addToast("Erro ao carregar dados de filtros", ToastTypes.ERROR);
    }
  }, [listCities, listInsurances, addToast]);

  const deleteUser = (value: number) => {
    const popupData = {
      data: {
        title: "Excluir Paciente?",
        message:
          "Tem certeza de que deseja excluir? Não há como desfazer esta ação!",
      },
      onConfirm: async () => {
        try {
          await remove.delete({ ids: [value] });
          addToast("Paciente apagado", ToastTypes.SUCESS);
          fetchPatients();
        } catch {
          addToast("Houve um problema ao apagar o paciente", ToastTypes.ERROR);
        }
      },
    };
    showPopup(popupData);
  };

  const kebabConfigs = [
    {
      icon: <RiFileUserFill />,
      name: "Ver detalhes",
      action: (id: number) => navigate(`detalhes/${id}`),
    },
    {
      icon: <FaUserEdit />,
      name: "Editar",
      action: (id: number) => navigate(`editar/${id}`),
    },
    {
      icon: <LuClipboardEdit />,
      name: "Prescrever",
      action: (id: number) => navigate(`detalhes/${id}/receitas`),
    },
    {
      icon: <BiTestTube />,
      name: "Exame",
      action: (id: number) => navigate(`detalhes/${id}/exames`),
    },
    {
      icon: <TiUserDelete />,
      name: "Deletar",
      action: deleteUser,
    },
  ];

  const tableFilters: DataFilter[] = [
    {
      placeholder: "Convênio",
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
      handle: (v: string) => setKeywords(v.split(" ")),
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
    fetchPatients();
  }, [fetchPatients]);

  useLayoutEffect(() => {
    fetchFiltersData();
  }, [fetchFiltersData]);

  return (
    <PacienteContainer>
      <PacienteCard>
        <PatientSection>
          <Breadcrumb items={breadcrumbItems} />
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
