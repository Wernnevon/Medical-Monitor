export interface ExamCategory {
  category: string;
  exams: string[];
}

export interface CouncilExamPermissions {
  council: string;
  label: string;
  /** `false` para conselhos que não solicitam exames laboratoriais/imagem
   *  (CRP, CRESS): a lista deles são avaliações e documentos técnicos. */
  canRequestMedicalExams: boolean;
  categories: ExamCategory[];
  legalBasis: string;
  notes: string;
}

export const COUNCIL_EXAM_PERMISSIONS: CouncilExamPermissions[] = [
  {
    council: 'CRM',
    label: 'CRM — Medicina',
    canRequestMedicalExams: true,
    legalBasis: 'Código de Ética Médica (Res. CFM 2.217/2018) e Lei 12.842/2013',
    notes: 'Ampla permissão para solicitar qualquer exame necessário para prevenção, diagnóstico, tratamento e reabilitação.',
    categories: [
      {
        category: 'HEMATOLOGIA',
        exams: ['Hemograma Completo', 'Leucograma', 'Eritrograma', 'Plaquetas', 'Coagulograma (TP, TTPA, INR)', 'Fibrinogênio', 'Reticulócitos', 'VHS', 'Eletroforese de Hemoglobina', 'Fator de Von Willebrand'],
      },
      {
        category: 'BIOQUÍMICA SÉRICA',
        exams: ['Glicemia de Jejum', 'Hemoglobina Glicada (HbA1c)', 'Ureia', 'Creatinina', 'Ácido Úrico', 'TGO (AST)', 'TGP (ALT)', 'FA (Fosfatase Alcalina)', 'GGT', 'Bilirrubinas', 'Albumina', 'Proteínas Totais', 'LDH', 'CK Total', 'CK-MB', 'Troponina', 'BNP / NT-proBNP', 'Amilase', 'Lipase', 'Eletrólitos (Na, K, Ca, P, Mg, Cl)', 'Ferro Sérico', 'TIBC', 'Ferritina', 'Transferrina'],
      },
      {
        category: 'HORMÔNIOS E MARCADORES ENDÓCRINOS',
        exams: ['TSH', 'T3 Livre', 'T4 Livre', 'FSH', 'LH', 'Prolactina', 'IGF-1', 'Beta HCG (Quant/Qual)', 'Progesterona', 'Testosterona (Total/Livre)', 'Estradiol', 'Cortisol (Manhã/Tarde)', 'ACTH', 'Paratormônio (PTH)', 'Insulina', 'Glucagon', 'Aldosterona', 'Renina', 'DHEA-S', '17-OH Progesterona'],
      },
      {
        category: 'LIPÍDIOS E RISCO CARDIOVASCULAR',
        exams: ['Colesterol Total', 'HDL', 'LDL', 'VLDL', 'Triglicerídeos', 'Apo A1', 'Apo B', 'Lipoproteína (a)', 'Homocisteína'],
      },
      {
        category: 'IMUNOLOGIA E SOROLOGIA',
        exams: ['Anti-HIV', 'Anti-HCV', 'HBsAg', 'Anti-HBs', 'Anti-HBc', 'VDRL', 'FTA-ABS', 'Toxoplasma (IgG/IgM)', 'CMV (IgG/IgM)', 'Rubéola (IgG/IgM)', 'Fator Reumatoide', 'PCR', 'ANA (FAN)', 'Anti-DNA', 'Complemento C3/C4', 'IgE Total', 'Painel Alergênico (IgE específica)', 'HLA-B27'],
      },
      {
        category: 'URINÁLISE E LÍQUIDOS',
        exams: ['EAS (Urina Tipo I)', 'Microalbuminúria', 'Proteinúria de 24h', 'Clearance de Creatinina', 'Urocultura com Antibiograma', 'Citologia Oncótica de Urina', 'Análise de Líquor', 'Análise de Líquido Sinovial', 'Análise de Líquido Pleural/Ascítico'],
      },
      {
        category: 'MICROBIOLOGIA',
        exams: ['Hemocultura', 'Urocultura', 'Coprocultura', 'Cultura de Secreção/Ferida', 'BAAR (Pesquisa e Cultura)', 'Cultura de Fungos', 'PCR Multiplex para patógenos'],
      },
      {
        category: 'MARCADORES TUMORAIS',
        exams: ['PSA Total e Livre', 'CA 125', 'CA 15-3', 'CA 19-9', 'CEA', 'Alfa-fetoproteína (AFP)', 'Beta HCG (marcador)'],
      },
      {
        category: 'VITAMINAS E MICRONUTRIENTES',
        exams: ['Vitamina D (25-OH)', 'Vitamina B12', 'Ácido Fólico', 'Vitamina A', 'Vitamina E', 'Vitamina K', 'Zinco', 'Selênio', 'Cobre'],
      },
      {
        category: 'EXAMES DE IMAGEM E ELETROFISIOLOGIA',
        exams: ['Raio-X (todas as regiões)', 'Ultrassonografia (todas as regiões)', 'Tomografia Computadorizada', 'Ressonância Magnética', 'Mamografia', 'Densitometria Óssea', 'Cintilografia', 'PET-CT', 'Ecocardiograma', 'Eletrocardiograma (ECG)', 'Holter 24h', 'MAPA', 'Eletroencefalograma (EEG)', 'Eletromiografia'],
      },
      {
        category: 'GENÉTICA E BIOLOGIA MOLECULAR',
        exams: ['Cariótipo', 'Painel de Trombofilia', 'Farmacogenética', 'Teste de Paternidade', 'Sequenciamento de Nova Geração (NGS)'],
      },
    ],
  },
  {
    council: 'CRO',
    label: 'CRO — Odontologia',
    canRequestMedicalExams: true,
    legalBasis: 'Lei 5.081/1966 e Resoluções CFO',
    notes: 'Foco em saúde bucal, maxilofacial, planejamento cirúrgico odontológico e condições sistêmicas que impactam o tratamento odontológico.',
    categories: [
      {
        category: 'ODONTOGRAMA E ÍNDICES CLÍNICOS',
        exams: ['Odontograma Completo (Adulto)', 'Odontograma Infantil (Decídua)', 'Odontograma Misto', 'Levantamento CPO-D / ceo-d', 'Índice de Placa Visível (IPV)', 'Índice Gengival (IG)', 'Índice de Sangramento Gengival (ISG)', 'Sondagem Periodontal (Profundidade de Bolsa)', 'Nível de Inserção Periodontal (NIP)', 'Mobilidade Dentária', 'Involução de Furca'],
      },
      {
        category: 'EXAMES DE IMAGEM ODONTOLÓGICA',
        exams: ['Radiografia Periapical', 'Radiografia Interproximal (Bite-Wing)', 'Radiografia Oclusal', 'Radiografia Panorâmica (Ortopantomografia)', 'Radiografia Cefalométrica (Lateral e Frontal)', 'Tomografia Computadorizada Cone Beam (CBCT)', 'Tomografia de Seio Maxilar', 'Tomografia de ATM', 'Ultrassonografia de Glândulas Salivares'],
      },
      {
        category: 'HEMATOLOGIA (Pré-cirúrgico)',
        exams: ['Hemograma Completo', 'Coagulograma Completo', 'TP', 'TTPA', 'INR', 'Tempo de Sangramento', 'Tempo de Coagulação', 'Plaquetas'],
      },
      {
        category: 'BIOQUÍMICA SÉRICA',
        exams: ['Glicemia de Jejum', 'Hemoglobina Glicada (HbA1c)', 'Ureia', 'Creatinina', 'TGO (AST)', 'TGP (ALT)', 'Cálcio Total', 'Cálcio Ionizado', 'Fósforo', 'Fosfatase Alcalina', 'Albumina'],
      },
      {
        category: 'IMUNOLOGIA E SOROLOGIA',
        exams: ['Anti-HIV', 'Anti-HCV', 'HBsAg', 'VDRL', 'Proteína C Reativa (PCR)', 'VHS', 'Fator Reumatoide', 'ANA (FAN)'],
      },
      {
        category: 'MICROBIOLOGIA ORAL',
        exams: ['Cultura de Placa Bacteriana', 'Teste de Sensibilidade a Antimicrobianos', 'Pesquisa de Porphyromonas gingivalis', 'Pesquisa de Aggregatibacter actinomycetemcomitans', 'Teste de Fluxo Salivar', 'pH Salivar', 'Capacidade Tampão da Saliva', 'Contagem de Streptococcus mutans e Lactobacillus'],
      },
      {
        category: 'HISTOPATOLOGIA ORAL',
        exams: ['Biópsia Incisional', 'Biópsia Excisional', 'Biópsia por Punção', 'Citologia Esfoliativa', 'Imunohistoquímica', 'Análise Histopatológica de Lesões Orais'],
      },
    ],
  },
  {
    council: 'CRF',
    label: 'CRF — Farmácia',
    canRequestMedicalExams: true,
    legalBasis: 'Resoluções CFF nº 585/2013 e nº 724/2022',
    notes: 'Exames solicitados EXCLUSIVAMENTE para monitoramento farmacoterapêutico (eficácia, segurança, adesão e toxicidade), não para diagnóstico clínico primário de doenças.',
    categories: [
      {
        category: 'BIOQUÍMICA (Monitoramento de Órgãos-Alvo)',
        exams: ['TGO (AST)', 'TGP (ALT)', 'GGT', 'FA', 'Bilirrubinas', 'Ureia', 'Creatinina', 'Clearance de Creatinina', 'Eletrólitos (K, Na, Ca, Mg)'],
      },
      {
        category: 'METABÓLICO E CARDIOVASCULAR',
        exams: ['Glicemia de Jejum', 'Hemoglobina Glicada (HbA1c)', 'Colesterol Total', 'HDL', 'LDL', 'Triglicerídeos', 'Ácido Úrico'],
      },
      {
        category: 'HEMATOLOGIA',
        exams: ['Hemograma Completo', 'Reticulócitos', 'VHS', 'Proteína C Reativa (PCR)'],
      },
      {
        category: 'HORMÔNIOS',
        exams: ['TSH', 'T4 Livre', 'Cortisol', 'Insulina'],
      },
      {
        category: 'URINÁLISE',
        exams: ['EAS (Urina Tipo I)', 'Microalbuminúria', 'Proteinúria'],
      },
      {
        category: 'VITAMINAS E MINERAIS',
        exams: ['Vitamina D (25-OH)', 'Vitamina B12', 'Ácido Fólico', 'Ferro Sérico', 'Ferritina'],
      },
    ],
  },
  {
    council: 'COREN',
    label: 'COREN — Enfermagem',
    canRequestMedicalExams: true,
    legalBasis: 'Lei 7.498/1986 e Resolução COFEN nº 195/1997',
    notes: 'Solicitação de exames de rotina e complementares no exercício de atividades profissionais, especialmente em programas de saúde pública, pré-natal de baixo risco, puerpério e atenção básica.',
    categories: [
      {
        category: 'HEMATOLOGIA',
        exams: ['Hemograma Completo', 'Plaquetas', 'VHS', 'Proteína C Reativa (PCR)'],
      },
      {
        category: 'BIOQUÍMICA SÉRICA',
        exams: ['Glicemia de Jejum', 'Glicemia Capilar', 'Hemoglobina Glicada (HbA1c)', 'Ureia', 'Creatinina', 'Ácido Úrico', 'Colesterol Total', 'HDL', 'LDL', 'Triglicerídeos', 'TGO', 'TGP', 'Bilirrubinas', 'Sódio', 'Potássio', 'Cálcio'],
      },
      {
        category: 'URINÁLISE E MICROBIOLOGIA',
        exams: ['EAS (Urina Tipo I)', 'Urocultura com Antibiograma', 'Coprocultura', 'Cultura de Secreção/Ferida', 'BAAR', 'Hemocultura'],
      },
      {
        category: 'SOROLOGIA (Foco em Pré-Natal e Rastreamento)',
        exams: ['Anti-HIV', 'VDRL', 'Anti-HCV', 'HBsAg', 'Beta HCG (Qualitativo/Quantitativo)', 'Rubéola (IgG/IgM)', 'Toxoplasma (IgG/IgM)', 'Citomegalovírus (IgG/IgM)'],
      },
    ],
  },
  {
    council: 'CREFITO',
    label: 'CREFITO — Fisioterapia e T.O.',
    canRequestMedicalExams: true,
    legalBasis: 'Lei 8.856/1994 e Resoluções COFFITO',
    notes: 'Exames solicitados estritamente para embasar o diagnóstico cinético-funcional, planejamento e conduta reabilitadora.',
    categories: [
      {
        category: 'EXAMES DE IMAGEM E ELETROFISIOLOGIA',
        exams: ['Raio-X (Coluna, Membros, Articulações)', 'Ultrassonografia Musculoesquelética', 'Ressonância Magnética (Coluna, Articulações, Tecidos Moles)', 'Tomografia Computadorizada (Óssea)', 'Densitometria Óssea', 'Eletromiografia (EMG)', 'Potencial Evocado Somatossensorial'],
      },
      {
        category: 'HEMATOLOGIA E INFLAMAÇÃO',
        exams: ['Hemograma Completo', 'VHS', 'Proteína C Reativa (PCR)', 'Fator Reumatoide', 'ANA (FAN)', 'Ácido Úrico', 'HLA-B27'],
      },
      {
        category: 'BIOQUÍMICA (Função Muscular e Óssea)',
        exams: ['CK Total', 'CK-MB', 'LDH', 'Lactato Sanguíneo', 'Cálcio Total', 'Fósforo', 'Magnésio', 'Vitamina D (25-OH)', 'Albumina'],
      },
      {
        category: 'URINÁLISE',
        exams: ['EAS (Urina Tipo I)', 'Proteinúria de 24h'],
      },
    ],
  },
  {
    council: 'CRP',
    label: 'CRP — Psicologia',
    canRequestMedicalExams: false,
    legalBasis: 'Lei 4.119/1962 e Código de Ética Profissional do Psicólogo',
    notes: 'O psicólogo NÃO solicita exames laboratoriais, de imagem ou invasivos. Sua "solicitação de exames" restringe-se a testes e avaliações psicológicas validadas pelo SATEPSI/CFP. Suspeitas de condições orgânicas devem ser encaminhadas à medicina.',
    categories: [
      {
        category: 'AVALIAÇÃO PSICOLÓGICA E NEUROPSICOLÓGICA',
        exams: ['Testes de Inteligência (WAIS, WISC)', 'Testes Projetivos (HTP, Rorschach, Zulliger)', 'Inventários de Depressão e Ansiedade (BDI, BAI, PHQ-9, GAD-7)', 'Avaliação Neuropsicológica (Memória, Atenção, Funções Executivas)', 'Testes de Personalidade (PF, PAL-Q)', 'Avaliação Psicopedagógica'],
      },
    ],
  },
  {
    council: 'CRN',
    label: 'CRN — Nutrição',
    canRequestMedicalExams: true,
    legalBasis: 'Lei 8.234/1991 (Art. 4º, VIII) e Resolução CFN nº 306/2003',
    notes: 'Exames solicitados para avaliação, prescrição e evolução nutricional, diagnóstico de deficiências e monitoramento de dietoterapia.',
    categories: [
      {
        category: 'VITAMINAS E MICRONUTRIENTES',
        exams: ['Vitamina D (25-OH)', 'Vitamina B12', 'Ácido Fólico', 'Vitamina A (Retinol)', 'Vitamina E (Alfa-Tocoferol)', 'Vitamina B1 (Tiamina)', 'Vitamina B6', 'Vitamina C', 'Zinco Sérico', 'Selênio', 'Cobre', 'Iodo Urinário'],
      },
      {
        category: 'METABOLISMO DO FERRO',
        exams: ['Ferro Sérico', 'Capacidade Total de Ligação do Ferro (TIBC)', 'Ferritina', 'Transferrina', 'Receptor Solúvel de Transferrina'],
      },
      {
        category: 'HORMÔNIOS E METABOLISMO',
        exams: ['TSH', 'T3 Livre', 'T4 Livre', 'Insulina Basal', 'Insulina Pós-Prandial', 'Cortisol', 'Leptina', 'Grelina', 'Adiponectina', 'Paratormônio (PTH)'],
      },
      {
        category: 'BIOQUÍMICA E LIPÍDIOS',
        exams: ['Glicemia de Jejum', 'Hemoglobina Glicada (HbA1c)', 'Colesterol Total', 'HDL', 'LDL', 'VLDL', 'Triglicerídeos', 'Apo A1', 'Apo B', 'Homocisteína', 'TGO', 'TGP', 'GGT', 'Ureia', 'Creatinina', 'Ácido Úrico', 'Albumina', 'Proteínas Totais'],
      },
      {
        category: 'URINÁLISE (Avaliação de Ingestão)',
        exams: ['EAS (Urina Tipo I)', 'Sódio Urinário de 24h', 'Potássio Urinário de 24h', 'Nitrogênio Ureico Urinário', 'Creatinina Urinária', 'Microalbuminúria'],
      },
      {
        category: 'IMUNOLOGIA E INFLAMAÇÃO',
        exams: ['Proteína C Reativa (PCR)', 'VHS', 'IgE Total', 'Painel Alergênico (IgE específica)', 'Anti-Transglutaminase (Doença Celíaca)', 'Anti-Endomísio'],
      },
      {
        category: 'TESTES DINÂMICOS',
        exams: ['Curva Glicêmica', 'Curva Insulinêmica', 'Teste de Tolerância à Glicose (TTG)'],
      },
    ],
  },
  {
    council: 'CRBM',
    label: 'CRBM — Biomedicina',
    canRequestMedicalExams: true,
    legalBasis: 'Lei 6.684/1979 e Resolução CFBM nº 347/2022',
    notes: 'A solicitação é vinculada à habilitação específica do profissional (ex: Análises Clínicas, Biomedicina Estética, Imagenologia). Na estética, foca em segurança pré-procedimento.',
    categories: [
      {
        category: 'HEMATOLOGIA E COAGULAÇÃO',
        exams: ['Hemograma Completo', 'Coagulograma (TP, TTPA, INR)', 'Fibrinogênio', 'Plaquetas', 'VHS', 'PCR'],
      },
      {
        category: 'BIOQUÍMICA E FUNÇÃO DE ÓRGÃOS',
        exams: ['TGO (AST)', 'TGP (ALT)', 'GGT', 'FA', 'Bilirrubinas', 'Ureia', 'Creatinina', 'Glicemia', 'HbA1c', 'Ácido Úrico', 'Proteínas Totais', 'Albumina', 'Eletrólitos (Na, K, Ca, Mg)'],
      },
      {
        category: 'HORMÔNIOS (Foco em Estética e Endócrino)',
        exams: ['TSH', 'T4 Livre', 'Testosterona (Total/Livre)', 'Estradiol', 'Progesterona', 'Cortisol', 'DHEA-S', '17-OH Progesterona', 'FSH', 'LH', 'Prolactina', 'Insulina'],
      },
      {
        category: 'LIPÍDIOS E MARCADORES',
        exams: ['Colesterol Total', 'HDL', 'LDL', 'Triglicerídeos', 'Ferro', 'Ferritina', 'Vitamina D (25-OH)', 'Vitamina B12'],
      },
      {
        category: 'SOROLOGIA E MICROBIOLOGIA',
        exams: ['Anti-HIV', 'Anti-HCV', 'HBsAg', 'VDRL', 'Urocultura', 'Cultura de Secreção', 'PCR para patógenos específicos'],
      },
      {
        category: 'MARCADORES TUMORAIS',
        exams: ['PSA Total e Livre', 'CA 125', 'CA 15-3', 'CA 19-9', 'CEA', 'Alfa-fetoproteína (AFP)'],
      },
    ],
  },
  {
    council: 'CRFa',
    label: 'CRFa — Fonoaudiologia',
    canRequestMedicalExams: true,
    legalBasis: 'Lei 6.965/1981 e Resoluções CFFa nº 246/2000 e nº 400/2010',
    notes: 'Exames solicitados para embasar o diagnóstico e a conduta fonoaudiológica (voz, fala, audição, linguagem e deglutição). Exames de imagem e laboratoriais são complementares ao quadro clínico funcional.',
    categories: [
      {
        category: 'AVALIAÇÕES FONOAUDIOLÓGICAS ESPECÍFICAS',
        exams: ['Audiometria Tonal Limiar', 'Audiometria Vocal', 'Impedanciometria (Timpanometria e Reflexos Acústicos)', 'Emissões Otoacústicas (EOA)', 'Potencial Evocado Auditivo de Tronco Encefálico (PEATE)', 'Videofluoroscopia da Deglutição (VFD)', 'Videonasofibrolaringoscopia', 'Avaliação Acústica da Voz (Acústica Vocal)', 'Aerodinâmica Vocal', 'Avaliação da Motricidade Orofacial (MBGR)'],
      },
      {
        category: 'EXAMES DE IMAGEM',
        exams: ['Ressonância Magnética (Encéfalo, Pescoço, Laringe)', 'Tomografia Computadorizada (Osso Temporal, Pescoço)', 'Raio-X de Crânio, Face e Coluna Cervical', 'Ultrassonografia de Pescoço/Tireoide/Glândulas Salivares'],
      },
      {
        category: 'HEMATOLOGIA E INFLAMAÇÃO',
        exams: ['Hemograma Completo', 'VHS', 'Proteína C Reativa (PCR)', 'Ferro Sérico', 'Ferritina'],
      },
      {
        category: 'BIOQUÍMICA E HORMÔNIOS',
        exams: ['TSH', 'T3 Livre', 'T4 Livre', 'Cortisol', 'Testosterona', 'Cálcio Total', 'Fósforo', 'Zinco', 'Magnésio', 'Albumina'],
      },
      {
        category: 'IMUNOLOGIA',
        exams: ['IgE Total', 'Painel Alergênico (IgE específica)', 'Anti-Transglutaminase (Doença Celíaca)'],
      },
    ],
  },
  {
    council: 'CRESS',
    label: 'CRESS — Serviço Social',
    canRequestMedicalExams: false,
    legalBasis: 'Lei 8.662/1993 (Código de Ética e Atribuições)',
    notes: 'O assistente social NÃO solicita exames laboratoriais, de imagem ou procedimentos médicos. Suas "solicitações" são documentos técnico-sociais para garantia de direitos.',
    categories: [
      {
        category: 'DOCUMENTAÇÃO TÉCNICO-SOCIAL',
        exams: ['Laudo Social', 'Estudo Psicossocial', 'Relatório Social', 'Parecer Social', 'Requerimento de Benefício de Prestação Continuada (BPC/LOAS)', 'Declaração de Hipossuficiência Econômica', 'Solicitação de Isenção Tarifária', 'Encaminhamento para Rede de Proteção Social'],
      },
    ],
  },
];
