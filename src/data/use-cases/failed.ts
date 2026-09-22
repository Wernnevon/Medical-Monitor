/**
 * Erro padrão da camada de dados.
 *
 * Mantém a mensagem que a interface já exibia, mas encadeia a causa original
 * em vez de descartá-la como o projeto React fazia — sem isso, uma falha de
 * IndexedDB (quota estourada, store ausente, transação abortada) chegava ao
 * console como "falha na requisição" e nada mais.
 */
export function failed(cause: unknown): Error {
  return new Error('falha na requisição', { cause });
}
