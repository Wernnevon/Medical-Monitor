/**
 * Campos de controle carregados por toda entidade persistida.
 *
 * `updatedAt` é preenchido em toda escrita (ver repositórios de `post`/`put`)
 * e existe para viabilizar resolução de conflito quando a sincronização com
 * um backend remoto entrar. Registros gravados antes deste campo existir
 * recebem backfill na primeira leitura.
 */
type Syncable = {
  updatedAt?: string;
};

export default Syncable;
