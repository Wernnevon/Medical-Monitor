/**
 * Máscaras de entrada, portadas de `legacy/src/Presentation/Utils/masks.ts`.
 *
 * Cada uma é idempotente: aplicar sobre um valor já mascarado devolve o
 * mesmo valor. É o que permite chamá-las a cada tecla sem embaralhar o que
 * o usuário digitou.
 */

export function mascaraCPF(valor: string): string {
  return valor
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
}

export function mascaraRG(valor: string): string {
  return valor.replace(/\D/g, '').replace(/(\d{7})\d+?$/, '$1');
}

/**
 * Formata como (DD) NNNNN-NNNN, aceitando fixo de 8 dígitos e celular de 9.
 *
 * A versão do projeto React inseria um espaço extra depois do nono dígito e
 * produzia "(81) 9 9999-8888". O grupo de 4 a 5 dígitos é ganancioso, então
 * o celular fica com 5 antes do hífen e o fixo com 4, sem caso especial.
 */
export function mascaraTelefone(valor: string): string {
  const digitos = valor.replace(/\D/g, '').slice(0, 11);
  return digitos
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{4,5})(\d{4})$/, '$1-$2');
}

export type NomeMascara = 'cpf' | 'rg' | 'telefone';

export const MASCARAS: Record<NomeMascara, (valor: string) => string> = {
  cpf: mascaraCPF,
  rg: mascaraRG,
  telefone: mascaraTelefone,
};

/** Remove tudo que não for dígito. Útil para validar o conteúdo mascarado. */
export const somenteDigitos = (valor: string): string => valor.replace(/\D/g, '');
