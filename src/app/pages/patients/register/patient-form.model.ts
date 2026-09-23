import type { Patient } from '@domain/entities';

/**
 * Modelo do formulário de paciente.
 *
 * Todos os campos são `string` porque é isso que um `<input>` produz,
 * inclusive os numéricos e os de data. Manter o formulário fiel ao que o
 * DOM entrega evita o vaivém de coerção que espalhava `Number(...)` e
 * `?? ''` por toda a tela no projeto React, e permite distinguir "não
 * preenchido" de "zero".
 *
 * A conversão para a entidade acontece num lugar só, em `paraEntidade`.
 */
export type PatientForm = {
  name: string;
  motherName: string;
  fatherName: string;
  birthday: string;
  rg: string;
  cpf: string;
  gender: string;
  phone: string;
  adress: {
    street: string;
    number: string;
    neighborhood: string;
    complement: string;
    city: string;
  };
  health: {
    healthInsurance: string;
    allergy: string;
    weight: string;
    height: string;
    bloodType: string;
  };
  anamnese: string;
};

export const formularioVazio = (): PatientForm => ({
  name: '',
  motherName: '',
  fatherName: '',
  birthday: '',
  rg: '',
  cpf: '',
  gender: '',
  phone: '',
  adress: {
    street: '',
    number: '',
    neighborhood: '',
    complement: '',
    city: '',
  },
  health: { healthInsurance: '', allergy: '', weight: '', height: '', bloodType: '' },
  anamnese: '',
});

const texto = (valor: unknown): string => (valor == null ? '' : String(valor));

const numero = (valor: string): number | undefined => {
  const limpo = valor.trim();
  if (!limpo) return undefined;
  const n = Number(limpo);
  return Number.isFinite(n) ? n : undefined;
};

const opcional = (valor: string): string | undefined =>
  valor.trim() ? valor.trim() : undefined;

/** Preenche o formulário a partir de um paciente já gravado. */
export function daEntidade(patient: Patient): PatientForm {
  return {
    name: texto(patient.name),
    motherName: texto(patient.motherName),
    fatherName: texto(patient.fatherName),
    birthday: texto(patient.birthday).slice(0, 10),
    rg: texto(patient.rg),
    cpf: texto(patient.cpf),
    gender: texto(patient.gender),
    phone: texto(patient.phone),
    adress: {
      street: texto(patient.adress?.street),
      number: texto(patient.adress?.number),
      neighborhood: texto(patient.adress?.neighborhood),
      complement: texto(patient.adress?.complement),
      city: texto(patient.adress?.city),
    },
    health: {
      healthInsurance: texto(patient.health?.healthInsurance),
      allergy: texto(patient.health?.allergy),
      weight: texto(patient.health?.weight),
      height: texto(patient.health?.height),
      bloodType: texto(patient.health?.bloodType),
    },
    anamnese: texto(patient.anamnese),
  };
}

/**
 * Converte o formulário na entidade a ser gravada.
 *
 * `id` vem vazio num cadastro novo; o repositório gera o UUID. Numa edição,
 * o id existente é preservado.
 */
export function paraEntidade(dados: PatientForm, id = ''): Patient {
  return {
    id,
    name: dados.name.trim(),
    motherName: dados.motherName.trim(),
    fatherName: dados.fatherName.trim(),
    // As datas trafegam como texto ISO curto em todo o app; é o que os
    // inputs produzem e o que a formatação de exibição espera.
    birthday: dados.birthday as unknown as Date,
    rg: dados.rg.trim(),
    cpf: dados.cpf.trim(),
    gender: dados.gender.trim(),
    phone: opcional(dados.phone),
    anamnese: dados.anamnese.trim(),
    adress: {
      street: dados.adress.street.trim(),
      number: numero(dados.adress.number) ?? 0,
      neighborhood: dados.adress.neighborhood.trim(),
      complement: opcional(dados.adress.complement),
      city: dados.adress.city.trim(),
    },
    health: {
      healthInsurance: dados.health.healthInsurance.trim(),
      allergy: opcional(dados.health.allergy),
      weight: numero(dados.health.weight),
      height: numero(dados.health.height),
      bloodType: opcional(dados.health.bloodType)?.toUpperCase(),
    },
  };
}
