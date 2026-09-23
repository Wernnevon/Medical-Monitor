import { getLocalDateInput } from '@core/utils/date-utils';

export const LIMITE_TEXTO = 500;

export type TipoAtestado = 'LABORAL' | 'ESCOLAR' | 'COMPARECIMENTO' | 'ACOMPANHANTE';

/** `atividades` completa a frase "necessitando de afastamento de suas …"
 *  na folha — comparecimento não afasta ninguém, só declara a presença. */
export const TIPOS_ATESTADO: { valor: TipoAtestado; rotulo: string; atividades: string }[] = [
  { valor: 'LABORAL', rotulo: 'Afastamento das atividades laborais', atividades: 'atividades laborais' },
  { valor: 'ESCOLAR', rotulo: 'Afastamento das atividades escolares', atividades: 'atividades escolares' },
  { valor: 'ACOMPANHANTE', rotulo: 'Acompanhante de paciente', atividades: 'atividades habituais, como acompanhante' },
  { valor: 'COMPARECIMENTO', rotulo: 'Declaração de comparecimento', atividades: '' },
];

export type AtestadoForm = {
  nome: string;
  cpf: string;
  /** `yyyy-mm-dd`, como no cadastro do paciente. */
  nascimento: string;
  convenio: string;
  tipo: TipoAtestado | '';
  inicio: string;
  fim: string;
  dias: string;
  cid: string;
  justificativa: string;
  orientacoes: string;
};

export const formularioVazio = (): AtestadoForm => ({
  nome: '',
  cpf: '',
  nascimento: '',
  convenio: '',
  tipo: '',
  inicio: getLocalDateInput(),
  fim: '',
  dias: '',
  cid: '',
  justificativa: '',
  orientacoes: '',
});

const DIA_MS = 86_400_000;

/** Datas `yyyy-mm-dd` lidas em UTC dos dois lados — só a diferença importa,
 *  então o fuso não desloca nada. */
export function diasEntre(inicio: string, fim: string): number {
  return Math.round((Date.parse(fim) - Date.parse(inicio)) / DIA_MS) + 1;
}

export function somarDias(inicio: string, dias: number): string {
  return new Date(Date.parse(inicio) + (dias - 1) * DIA_MS).toISOString().substring(0, 10);
}

export function formatarData(data: string): string {
  const [ano, mes, dia] = data.split('-');
  return ano && mes && dia ? `${dia}/${mes}/${ano}` : '';
}

const UNIDADES = ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove',
  'dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'];
const DEZENAS = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];

/** "2 (dois) dias". Acima de 99 fica só o número — ninguém escreve
 *  atestado de três dígitos por extenso. */
export function diasPorExtenso(n: number): string {
  if (!Number.isInteger(n) || n < 1) return '';
  const unidade = n === 1 ? 'dia' : 'dias';
  if (n > 99) return `${n} ${unidade}`;
  const extenso =
    n < 20 ? UNIDADES[n] : DEZENAS[Math.floor(n / 10)] + (n % 10 ? ` e ${UNIDADES[n % 10]}` : '');
  return `${n} (${extenso}) ${unidade}`;
}
