import { useContext, useState, createContext, ReactNode } from "react";

interface ExameProps {
  children: ReactNode;
}
interface Exames {
  type?: string;
  exames?: Array<string>;
}

interface ExameContexData {
  handleSelectExame: (exame: string) => void;
  handleClear: () => void;
  selected: string[];
  exames: Exames[];
}

const ExameContext = createContext({} as ExameContexData);

export function ExameProvider({ children }: ExameProps) {
  const Hormonio = [
    "TSH",
    "T3 Total",
    "T4 Total",
    "T3 Livre",
    "T4 Live",
    "FSH",
    "Prolactina",
    "Iget Total",
    "Beta HCG Quantitativo",
    "Beta HCG Qualitativo",
    "Progesterona",
    "Testosterona",
  ];
  const Hematologia = [
    "Hemograma Completo",
    "Coagulograma",
    "Tempo de Protombina - TAPE",
    "Tempo de Tromboplastina",
    "Grupo sanguíneo fator RH",
    "VSH - Hemossedimentação",
    "Leucrograma",
    "Eritrograma",
    "Teste de Coombs - Direto",
    "Teste de Coombs - Indireto",
    "Contagem de Reticulócitos",
  ];
  const Bioquimica = [
    "Glicose de Jejum",
    "Glicose pós Prandial",
    "Colesterol Total",
    "Colesterol HDL",
    "Colesterol LDL",
    "Colesterol VLDL",
    "Triglicérides",
    "Ácido Úrico",
    "Uréia",
    "Creatinina",
    "Transaminase TGP",
    "Transaminase TGO",
    "Bilirrubina Total e Frações",
    "Fosfatase Alcalina",
    "Gama GT",
    "DLH",
    "Amilase",
    "Sodio - NA",
    "Potássio - K",
    "Lítio - LI",
    "CPK",
  ];
  const Imunologia = [
    "ASLO",
    "PCR",
    "Latex",
    "FTA ABS IGG",
    "FTA ABS IGM",
    "HIV",
    "Chagas Sorologia",
    "Chagas Imunofluorescência",
  ];
  const Parasitologia = [
    "Parasitológico de Fezes",
    "MIF",
    "SWAB anal",
    "Parasitológico Seriado",
    "Pesquisa de Leucócitos e Leveduras",
    "Cropologia Funcional",
  ];
  const Tumorais = ["CEA", "CA 125", "CA 19-9", "PSA Total", "PSA Livre"];
  const Microbiologia = [
    "Cultura de Sec. Orafaringe",
    "Cultura de Sec. Vaginal",
    "Cultura de Sec. Uretal",
    "Cultura de Sec. Purulenta",
    "Cultura de Sec. (Exsudatos)",
    "Bacterioscopia BK - BAAR - Escarro",
    "Baterioscopia - Gram",
  ];
  const Urianalise = [
    "Sumário de Urina - EAS",
    "Urocultura - Cultura de Urina",
    "Proteína - Urina 24 Horas",
  ];

  const exames: Array<Exames> = [
    {
      type: "Hormônio",
      exames: Hormonio,
    },
    {
      type: "Hematologia",
      exames: Hematologia,
    },
    {
      type: "Bioquímica",
      exames: Bioquimica,
    },
    {
      type: "Imunologia",
      exames: Imunologia,
    },
    {
      type: "Parasitologia",
      exames: Parasitologia,
    },
    {
      type: "Marcadores Tumorais",
      exames: Tumorais,
    },
    {
      type: "Microbiologia",
      exames: Microbiologia,
    },
    {
      type: "Urianálise",
      exames: Urianalise,
    },
  ];

  const [selected, setSelected] = useState<string[]>([]);

  function handleSelectExame(exame: string) {
    let ex = [...selected, exame];
    if (selected.includes(exame)) {
      ex = selected.filter((exam: any) => exam !== exame);
    }
    setSelected(ex);
  }
  function handleClear() {
    setSelected([]);
  }

  return (
    <ExameContext.Provider
      value={{ handleSelectExame, handleClear, selected, exames }}
    >
      {children}
    </ExameContext.Provider>
  );
}

export const useExame = () => useContext(ExameContext);
