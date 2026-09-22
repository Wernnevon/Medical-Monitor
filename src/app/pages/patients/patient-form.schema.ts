import {
  apply,
  maxLength,
  required,
  schema,
  validate,
} from '@angular/forms/signals';
import { somenteDigitos } from '@core/utils/masks';
import type { PatientForm } from './patient-form.model';

/**
 * Regras de validação do cadastro, agrupadas por etapa.
 *
 * Substituem os três schemas Yup que viviam soltos dentro de cada step do
 * projeto React. Aqui ficam fora do componente e são compostos com `apply`,
 * então a etapa cuida só de apresentação e cada regra é testável isolada.
 */

const dadosPessoais = schema<PatientForm>((p) => {
  required(p.name, { message: 'Preencha o nome completo do paciente' });
  required(p.motherName, { message: 'Preencha o nome completo da mãe' });
  required(p.fatherName, { message: 'Preencha o nome completo do pai' });
  required(p.birthday, { message: 'Informe a data de nascimento' });
  required(p.gender, { message: 'Informe o gênero' });
  required(p.rg, { message: 'Informe o RG' });
  required(p.cpf, { message: 'Informe o CPF' });

  // O CPF chega mascarado (000.000.000-00), então a contagem é sobre os
  // dígitos e não sobre o texto exibido.
  validate(p.cpf, ({ value }) =>
    !value() || somenteDigitos(value()).length === 11
      ? undefined
      : { kind: 'cpf', message: 'CPF incompleto' },
  );

  validate(p.birthday, ({ value }) => {
    if (!value()) return undefined;
    const data = new Date(`${value()}T00:00:00`);
    if (Number.isNaN(data.getTime())) {
      return { kind: 'data', message: 'Data inválida' };
    }
    // Sem isto, um erro de digitação no ano (2205 em vez de 2005) passa e só
    // aparece depois, como idade negativa na tela de detalhes.
    return data > new Date()
      ? { kind: 'futuro', message: 'A data não pode estar no futuro' }
      : undefined;
  });
});

const endereco = schema<PatientForm['adress']>((a) => {
  required(a.street, { message: 'Informe a rua' });
  required(a.neighborhood, { message: 'Informe o bairro' });
  required(a.city, { message: 'Informe a cidade' });
});

const saude = schema<PatientForm['health']>((h) => {
  maxLength(h.allergy, 200, { message: 'Descrição de alergias muito longa' });

  const positivo = (rotulo: string) => (ctx: { value: () => string }) => {
    const bruto = ctx.value().trim();
    if (!bruto) return undefined;
    const n = Number(bruto);
    if (!Number.isFinite(n)) return { kind: 'numero', message: `${rotulo} inválido` };
    return n > 0 ? undefined : { kind: 'positivo', message: `${rotulo} deve ser maior que zero` };
  };

  validate(h.weight, positivo('Peso'));
  validate(h.height, positivo('Altura'));
});

export const patientSchema = schema<PatientForm>((p) => {
  apply(p, dadosPessoais);
  apply(p.adress, endereco);
  apply(p.health, saude);
});
