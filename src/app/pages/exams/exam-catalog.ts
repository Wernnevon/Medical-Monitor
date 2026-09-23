/**
 * Catálogo estático de exames por categoria, oferecido como checklist na
 * tela de solicitação. Espelha `legacy/src/Presentation/Hooks/useExam` —
 * dado de referência da clínica, não do domínio, então vive aqui e não em
 * `domain/`.
 */
export type CategoriaExame = {
  tipo: string;
  exames: string[];
};

export const CATALOGO_EXAMES: CategoriaExame[] = [
  {
    tipo: 'Hormônio',
    exames: [
      'TSH',
      'T3 Total',
      'T4 Total',
      'T3 Livre',
      'T4 Livre',
      'FSH',
      'Prolactina',
      'Iget Total',
      'Beta HCG Quantitativo',
      'Beta HCG Qualitativo',
      'Progesterona',
      'Testosterona',
    ],
  },
  {
    tipo: 'Hematologia',
    exames: [
      'Hemograma Completo',
      'Coagulograma',
      'Tempo de Protrombina - TAP',
      'Tempo de Tromboplastina',
      'Grupo sanguíneo fator RH',
      'VSH - Hemossedimentação',
      'Leucograma',
      'Eritrograma',
      'Teste de Coombs - Direto',
      'Teste de Coombs - Indireto',
      'Contagem de Reticulócitos',
    ],
  },
  {
    tipo: 'Bioquímica',
    exames: [
      'Glicose de Jejum',
      'Glicose pós Prandial',
      'Colesterol Total',
      'Colesterol HDL',
      'Colesterol LDL',
      'Colesterol VLDL',
      'Triglicérides',
      'Ácido Úrico',
      'Uréia',
      'Creatinina',
      'Transaminase TGP',
      'Transaminase TGO',
      'Bilirrubina Total e Frações',
      'Fosfatase Alcalina',
      'Gama GT',
      'DLH',
      'Amilase',
      'Sódio - NA',
      'Potássio - K',
      'Lítio - LI',
      'CPK',
    ],
  },
  {
    tipo: 'Imunologia',
    exames: [
      'ASLO',
      'PCR',
      'Látex',
      'FTA ABS IGG',
      'FTA ABS IGM',
      'HIV',
      'Chagas Sorologia',
      'Chagas Imunofluorescência',
    ],
  },
  {
    tipo: 'Parasitologia',
    exames: [
      'Parasitológico de Fezes',
      'MIF',
      'SWAB anal',
      'Parasitológico Seriado',
      'Pesquisa de Leucócitos e Leveduras',
      'Coprologia Funcional',
    ],
  },
  {
    tipo: 'Marcadores Tumorais',
    exames: ['CEA', 'CA 125', 'CA 19-9', 'PSA Total', 'PSA Livre'],
  },
  {
    tipo: 'Microbiologia',
    exames: [
      'Cultura de Sec. Orofaringe',
      'Cultura de Sec. Vaginal',
      'Cultura de Sec. Uretral',
      'Cultura de Sec. Purulenta',
      'Cultura de Sec. (Exsudatos)',
      'Bacterioscopia BK - BAAR - Escarro',
      'Bacterioscopia - Gram',
    ],
  },
  {
    tipo: 'Urianálise',
    exames: [
      'Sumário de Urina - EAS',
      'Urocultura - Cultura de Urina',
      'Proteína - Urina 24 Horas',
    ],
  },
];
