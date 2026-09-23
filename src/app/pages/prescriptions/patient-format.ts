import { getAge } from '@core/utils/date-utils';

/** "12/03/1991 (34 anos)". O nascimento é gravado como `yyyy-mm-dd`, então
 *  é lido por partes — `new Date('1991-03-12')` seria meia-noite UTC e
 *  mostraria o dia anterior no Brasil. */
export function formatarNascimento(data: Date | string): string {
  const [ano, mes, dia] = String(data).substring(0, 10).split('-');
  if (!ano || !mes || !dia) return '';
  const idade = getAge(new Date(Number(ano), Number(mes) - 1, Number(dia)));
  return `${dia}/${mes}/${ano} (${idade} anos)`;
}

export function iniciais(nome: string): string {
  const partes = nome.trim().split(/\s+/).filter(Boolean);
  if (!partes.length) return '';
  const primeira = partes[0][0];
  const ultima = partes.length > 1 ? partes[partes.length - 1][0] : '';
  return `${primeira}${ultima}`.toUpperCase();
}
