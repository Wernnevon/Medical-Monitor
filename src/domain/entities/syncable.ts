/**
 * Campos de controle carregados por toda entidade persistida.
 *
 * `id` é um UUID gerado no cliente, e não um inteiro sequencial. Chave
 * autoincremental é atribuída pelo banco local, então dois dispositivos
 * offline criariam ambos o "paciente 1" — a colisão é certa no primeiro
 * sync. Gerar a chave na escrita torna o identificador único desde a
 * origem, sem coordenação.
 *
 * `updatedAt` é preenchido em toda escrita e existe para viabilizar
 * resolução de conflito. É indexado, para que o sync incremental consiga
 * perguntar "o que mudou desde X" sem varrer a base.
 */
type Syncable = {
  id: string;
  updatedAt?: string;
};

export default Syncable;
